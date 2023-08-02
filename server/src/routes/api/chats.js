const express = require("express");
const router = express.Router();
const chatController = require("../../controllers/chats");

/*---------- Public Routes ----------*/
router.get("/get", chatController.getAllChats);
router.post("/create", chatController.createChat);
router.delete("/delete/:id", chatController.deleteChat);

/*---------- Protected Routes ----------*/

module.exports = router;
