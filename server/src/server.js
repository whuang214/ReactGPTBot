require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const favicon = require("serve-favicon");

require("./config/database");

const app = express();

// app.use(logger("dev"));
app.use(logger("combined")); // for production
app.use(express.json());
app.use(cors()); // allow requests from all origins (front end)

// Configure the auth middleware
// This decodes the jwt token, and assigns
// the user information to req.user
app.use(require("./config/auth"));

// api routes must be before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
app.use("/api/chats", require("./routes/api/chats"));

// "catch all" route
app.get("/*", function (req, res) {
  res.status(404).json({ msg: "Not Found" });
});

const port = process.env.PORT || 3001;

// app.listen(port, () => {
//   console.log();
//   console.log(`  App running in port ${port}`);
//   console.log();
//   console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
// });

app.listen(port, () => {
  console.log(`App is now running on port ${port}`);
});
