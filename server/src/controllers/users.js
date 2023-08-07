const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const BUCKET_NAME = process.env.BUCKET_NAME;

const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();

module.exports = {
  signup,
  login,
};

// signup function
// req.body will contain the form data from Postman or from React
async function signup(req, res) {
  // console.log(req.body, req.file, " req.body", "req.file");

  // if no file is uploaded, req.file will be undefined
  if (!req.file) return res.status(400).json({ msg: "Please upload a file" });

  // create a user based on the incoming data from the form
  const user = new User(req.body);

  // make the filepath unique by adding a uuid to the filename
  const filePath = `reactChatBot/users/${user._id}/images/profile/${
    req.file.originalname
  }-${uuidv4()}`;

  // create the object that we will send to S3
  const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer };

  try {
    // make the request to S3
    const data = await s3.upload(params).promise();

    console.log("===============================");
    console.log(data, " <- data from aws");
    console.log("===============================");

    // create a new user object
    user.photoUrl = data.Location; // add the URL of the image to the user object
    await user.save(); // save the user to the database
    const token = createJWT(user); // make a token for the user
    res.json({ token }); // send the token to the client
  } catch (err) {
    console.log("===============================");
    console.log(err, " <- error during S3 upload or database saving");
    console.log("===============================");
    res
      .status(400)
      .json({
        error: "Error during S3 upload or database saving, check your console",
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

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" }
  );
}
