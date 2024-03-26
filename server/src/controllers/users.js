const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const BUCKET_NAME = process.env.BUCKET_NAME;

const { v4: uuidv4 } = require("uuid");

// Updated import statements for AWS SDK v3
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");

// Create an S3 client object
const s3Client = new S3Client();

module.exports = {
  signup,
  login,
  testServer,
};

// Helper function to upload a file to S3
async function uploadFileToS3(fileBuffer, bucketName, key) {
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucketName,
      Key: key,
      Body: fileBuffer,
    },
  });

  try {
    const result = await upload.done();
    console.log("Upload success", result);
    return result.Location; // The URL of the uploaded file
  } catch (err) {
    console.log("Upload error", err);
    throw new Error("File upload to S3 failed");
  }
}

// signup function
// req.body will contain the form data from Postman or from React
async function signup(req, res) {
  let hasPhoto;

  const user = new User(req.body);

  if (!req.file) {
    user.photoUrl =
      "https://sei-pupstagram.s3.amazonaws.com/reactChatBot/placeholders/placeholder-person-square.png";
  } else {
    const filePath = `reactChatBot/users/${user._id}/images/profile/${
      req.file.originalname
    }-${uuidv4()}`;
    try {
      // Use the helper function to upload to S3
      const photoUrl = await uploadFileToS3(
        req.file.buffer,
        BUCKET_NAME,
        filePath
      );
      user.photoUrl = photoUrl;
    } catch (err) {
      return res.status(400).json({
        error: "Error during S3 upload, check your console",
      });
    }
  }

  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json({
      error: "Error during database saving, check your console",
    });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function testServer(req, res) {
  // console.log(req.body, " <- req.body in request");
  res.status(200).json({ message: "server is running" });
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" }
  );
}
