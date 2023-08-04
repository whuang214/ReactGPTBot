const API_URL = "http://localhost:8000/api/chats/";

import tokenService from "./tokenService";

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

export default {
  getAllChats,
};
