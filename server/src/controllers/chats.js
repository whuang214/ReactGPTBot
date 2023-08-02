// controller for chat boilerplate
const Chat = require("../models/chat");

module.exports = { getAllChats, createChat, deleteChat };

// get all chats with userid equal to the user id
async function getAllChats(req, res) {
  // could also do by params
  try {
    const chats = await Chat.find({ userID: req.user._id });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json(err);
  }
}

// create a chat
async function createChat(req, res) {}

// delete a chat
async function deleteChat(req, res) {}
