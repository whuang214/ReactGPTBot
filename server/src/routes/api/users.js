const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

// Require multer for the file uploads
const multer = require("multer");
const upload = multer();

/*---------- Public Routes ----------*/
router.post("/signup", upload.single("avatar"), usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.post("/test", usersCtrl.testServer);

/*---------- Protected Routes ----------*/

module.exports = router;
