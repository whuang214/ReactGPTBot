const { queryGPT3_5Turbo, queryGPT4 } = require("../services/openaiService");
const { ChatHistory, Message } = require("../models/chat");
const mongoose = require("mongoose");

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
    const chats = await ChatHistory.find({ userID: req.user._id });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// get a chat by id
async function getChat(req, res) {
  try {
    const chat = await ChatHistory.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found." });
    }

    if (String(chat.userID) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to access this chat." });
    }

    res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// create a chat
// what req.body should look like: { userID: userID, title: title }
async function createChat(req, res) {
  try {
    const { title } = req.body;
    console.log(req.body);
    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    const newChat = new ChatHistory({
      userID: mongoose.Types.ObjectId(req.user._id.toString()),
      title: title,
      messages: [],
    });

    await newChat.save();

    res.status(201).json(newChat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function addMessage(req, res) {
  const model = req.body.model;

  try {
    const chat = await ChatHistory.findById(req.body.chatID);
    if (!chat) throw new Error("Chat not found.");

    // Create user message and save to Message model
    const userMessage = new Message({
      content: req.body.messageContent,
      sender: "user",
    });
    await userMessage.save();

    chat.messages.push(userMessage._id);

    let gptResponse;

    if (model === "gpt-3.5-turbo") {
      gptResponse = await queryGPT3_5Turbo([
        { content: userMessage.content, sender: userMessage.sender },
      ]);
    } else if (model === "gpt-4") {
      gptResponse = await queryGPT4([
        { content: userMessage.content, sender: userMessage.sender },
      ]);
    } else {
      throw new Error("Invalid model specified.");
    }

    // Create assistant message and save to Message model
    const assistantMessage = new Message({
      content: gptResponse,
      sender: "assistant",
    });
    await assistantMessage.save();

    chat.messages.push(assistantMessage._id);

    await chat.save();

    res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// delete a chat
// req.body = { chatID: chatID }
async function deleteChat(req, res) {
  try {
    const { chatID } = req.body;
    if (!chatID) {
      return res.status(400).json({ error: "Chat ID is required." });
    }

    const chat = await ChatHistory.findById(chatID);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found." });
    }

    if (String(chat.userID) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this chat." });
    }

    // Delete all messages associated with this chat
    await Message.deleteMany({ _id: { $in: chat.messages } });

    // If checks pass, delete the chat
    await ChatHistory.findByIdAndRemove(chatID);

    res.status(200).json({ message: "Chat deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
