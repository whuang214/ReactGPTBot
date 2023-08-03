const { queryGPT3_5Turbo, queryGPT4 } = require("../services/openaiService");
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
    res.status(500).json({ error: err.message });
  }
}

// get a chat by id
async function getChat(req, res) {
  try {
    const chat = await Chat.findById(req.params.id);

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

// add a message to a chat
// req.body = { chatID: chatID, message: message, model: model }
async function addMessage(req, res) {
  const model = req.body.model;

  try {
    const chat = await Chat.findById(req.body.chatID);
    chat.messages.push(req.body.message);
    let gptResponse;

    if (model === "gpt-3.5-turbo") {
      gptResponse = await queryGPT3_5Turbo(chat.messages);
    } else if (model === "gpt-4") {
      gptResponse = await queryGPT4(chat.messages);
    } else {
      throw new Error("Invalid model specified.");
    }

    chat.messages.push(gptResponse);
    await chat.save();

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
    const { userID, title } = req.body;
    if (!userID || !title) {
      return res.status(400).json({ error: "User ID and title are required." });
    }

    const newChat = new ChatHistory({
      userID: mongoose.Types.ObjectId(userID),
      title: title,
      messages: [],
    });

    await newChat.save();

    // Optionally, you can also push this chat to the user's chats array
    const user = await User.findById(userID);
    user.chats.push(newChat._id);
    await user.save();

    res.status(201).json(newChat);
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

    // If checks pass, delete the chat
    await ChatHistory.findByIdAndRemove(chatID);

    res.status(200).json({ message: "Chat deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
