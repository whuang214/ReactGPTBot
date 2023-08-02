import { queryGPT3_5Turbo, queryGPT4 } from "../services/openaiService";

const Chat = require("../models/chat");

module.exports = {
  getAllChats,
  getChat,
  addMessage,
  createChat,
  deleteChat,
};

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

// get a chat by id
async function getChat(req, res) {
  try {
    const chat = await Chat.findById(req.body.chatID);
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
}

// add a message to a chat
// req.body = { chatID: chatID, message: message, model: model }
async function addMessage(req, res) {
  const model = req.body.model; // only 2 models for now gpt3.5 and gpt4
  try {
    const chat = await Chat.findById(req.body.chatID);
    chat.messages.push(req.body.message);
    // get the response from GPT-3.5 Turbo before saving and pushing to messages

    if (model === "gpt-3.5-turbo") {
      queryGPT3_5Turbo(chat.messages).then((response) => {
        chat.messages.push(response);
      });
    } else if (model === "gpt-4") {
      queryGPT4(chat.messages).then((response) => {
        chat.messages.push(response);
      });
    } else {
      console.log("Invalid model, fix frontend pls");
      res.status(500).json({ error: "Invalid model" });
    }

    await chat.save();
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
}

// create a chat
async function createChat(req, res) {}

// delete a chat
async function deleteChat(req, res) {}
