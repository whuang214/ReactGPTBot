const { queryGPT } = require("../services/openaiService");
const { ChatHistory, Message } = require("../models/chat");
const mongoose = require("mongoose");

module.exports = {
  getAllChats,
  getChat,
  addMessage,
  createChat,
  deleteChat,
  renameChat,
  createTitleName,
  deleteAllChats,
};

// get all chats with userid equal to the user id
async function getAllChats(req, res) {
  // could also do by params
  try {
    const chats = await ChatHistory.find({ userID: req.user._id }).sort({
      updatedAt: -1,
    });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// get a chat by id
async function getChat(req, res) {
  try {
    const chat = await ChatHistory.findById(req.params.id).populate("messages");

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
// what req.body should look like: { title: title }
async function createChat(req, res) {
  try {
    const { title } = req.body;
    console.log(req.body);
    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    const newChat = new ChatHistory({
      userID: req.user._id,
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

// add a message to a chat
// req.body = { chatID: chatID, messageContent: messageContent, model: model }
async function addMessage(req, res) {
  const model = req.body.model;

  try {
    const chat = await ChatHistory.findById(req.body.chatID).populate(
      "messages"
    );
    if (!chat) throw new Error("Chat not found.");

    const userMessage = new Message({
      content: req.body.messageContent,
      role: "user",
    });

    let gptResponse;

    try {
      gptResponse = await queryGPT([...chat.messages, userMessage], model);

      if (!gptResponse.content || !gptResponse.role) {
        throw new Error("Invalid GPT response.");
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }

    await userMessage.save();
    chat.messages.push(userMessage._id);

    const assistantMessage = new Message({
      content: gptResponse.content,
      role: gptResponse.role,
    });
    await assistantMessage.save();
    chat.messages.push(assistantMessage._id);

    await chat.save();

    // only return the chatID, userMessage, and assistantMessage
    res.status(200).json({
      chatID: chat._id,
      userMessage: userMessage,
      assistantMessage: assistantMessage,
    });
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
    await ChatHistory.findByIdAndDelete(chatID);

    res.status(200).json({ message: "Chat deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// rename a chat
// req.body = { chatID: chatID, newTitle: newTitle }
async function renameChat(req, res) {
  try {
    const { chatID, newTitle } = req.body;
    const renamedChat = await ChatHistory.findByIdAndUpdate(
      chatID,
      { title: newTitle.title },
      { new: true }
    );
    res.status(200).json(renamedChat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// create a title name
// req.body = { chatID: chatID, message: message }
async function createTitleName(req, res) {
  try {
    const { message } = req.body;
    const prompt = `Provide a just the concise title for a chat conversation based on the following message (no quotes please): ${message}`;
    const titleName = await queryGPT(prompt, "gpt-3.5-turbo");

    // TODO
    // find the chat by id
    // update the title with the title name
    // return the chat
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// delete all chats
async function deleteAllChats(req, res) {
  try {
    await ChatHistory.deleteMany({ userID: req.user._id });
    res.status(200).json({ message: "All chats deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
