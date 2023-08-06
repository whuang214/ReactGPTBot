const API_URL = "http://localhost:8000/api/chats/";

import tokenService from "./tokenService";

// get all chats
async function getAllChats() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch chats");
    }

    const chats = await response.json();
    return chats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return []; // if error occurs return empty array
  }
}

// get a chat
// req.params.id = chatID
async function getChat(chatID) {
  try {
    const response = await fetch(API_URL + chatID, {
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch chat");
    }

    const chat = await response.json();
    return chat;
  } catch (error) {
    console.error("Error fetching chat:", error);
    return { error: error.message };
  }
}

// create a chat
// req.body = { name: "chat name" }
async function startChat(message) {
  // make a POST request to the server to API_URL + "create" with the title
  // make a POST request to the server to API_URL + "addMessage" for the message
  try {
    const response = await fetch(API_URL + "create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify({
        title: message,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create chat");
    }

    const chat = await response.json();
    return chat;
  } catch (error) {
    console.error("Error creating chat:", error);
    return { error: error.message };
  }
}

// delete a chat
// req.body = { chatID: chatID }
async function deleteChat(chatID) {
  try {
    const response = await fetch(API_URL + "delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify({ chatID: chatID }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete chat");
    }

    const chat = await response.json();
    return chat;
  } catch (error) {
    console.error("Error deleting chat:", error);
    return { error: error.message };
  }
}

// add a message to a chat
// req.body = { chatID: chatID, messageContent: messageContent, model: model }
async function sendPrompt(chatID, messageContent, model) {
  try {
    const response = await fetch(API_URL + "addMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify({
        chatID: chatID,
        messageContent: messageContent,
        model: model,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send prompt");
    }

    const prompt = await response.json();
    return prompt;
  } catch (error) {
    console.error("Error sending prompt:", error);
    return { error: error.message };
  }
}

export default {
  getAllChats,
  startChat,
  deleteChat,
  sendPrompt,
  getChat,
};
