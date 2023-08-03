const express = require("express");
const router = express.Router();
const chatController = require("../../controllers/chats");

/*---------- Public Routes ----------*/
router.get("/", chatController.getAllChats);

/*---------- Protected Routes ----------*/

router.use(require("../../config/auth"));
router.get("/:id", chatController.getChat); // Get a specific chat by id
router.post("/create", chatController.createChat); // Create a new chat
router.post("/addMessage", chatController.addMessage); // Add a message to a chat
router.delete("/delete/", chatController.deleteChat); // Delete a chat by id
module.exports = router;
