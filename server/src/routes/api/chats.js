const express = require("express");
const router = express.Router();
const chatController = require("../../controllers/chats");

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/

router.use(require("../../config/auth"));
router.get("/", chatController.getAllChats); // based on user id
router.get("/:id", chatController.getChat); // Get a specific chat by id
router.put("/rename", chatController.renameChat); // Add a message to a chat
router.post("/create", chatController.createChat); // Create a new chat
router.post("/addMessage", chatController.addMessage); // Add a message to a chat
router.delete("/delete", chatController.deleteChat); // Delete a chat by id
router.delete("/deleteAll", chatController.deleteAllChats); // Delete all chats
module.exports = router;
