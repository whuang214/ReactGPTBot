require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const favicon = require("serve-favicon");

require("./config/database");

// Require controllers here

const app = express();

// add in when the app is ready to be deployed
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger("dev"));
app.use(express.json());
app.use(cors()); // allow requests from all origins (front end)

// Configure the auth middleware
// This decodes the jwt token, and assigns
// the user information to req.user
app.use(require("./config/auth"));

// api routes must be before the "catch all" route
app.use("/api/users", require("./routes/api/users"));

// "catch all" route
app.get("/*", function (req, res) {
  // res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.status(404).json({ msg: "Not Found" });
});

const port = process.env.PORT || 3001;

const { PORT = 8000 } = process.env;
app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
