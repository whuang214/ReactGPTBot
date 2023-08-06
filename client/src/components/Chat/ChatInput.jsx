import { useState } from "react";

import { AiOutlineSend } from "react-icons/ai";
import styles from "./ChatInput.module.css";

import chatService from "../../utils/chatService";

export default function ChatInput({ currentChat, setCurrentChat }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      return;
    }

    // make a new chat if there isn't one
    let chat;
    if (!currentChat) {
      const result = await chatService.startChat("New Chat");

      if (result.error) {
        console.error("Error starting chat:", result.error);
        return;
      }

      chat = result;
      setCurrentChat(chat);
    } else {
      chat = currentChat;
    }

    // send a message to the chat
    const promptResult = await chatService.sendPrompt(
      chat._id,
      message,
      "gpt-3.5-turbo" // hard coded for now
    );

    if (promptResult.error) {
      console.error("Error sending prompt:", promptResult.error);
      return;
    }

    setMessage(""); // Clear the message input

    // fetch the chat again to get the new messages
    const updatedChat = await chatService.getChat(chat._id);
    if (updatedChat.error) {
      console.error("Error getting chat:", updatedChat.error);
      return;
    }

    setCurrentChat(updatedChat);
  };

  return (
    <div className={styles.chatInputContainer}>
      <form onSubmit={handleSubmit} className={styles.chatInputForm}>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={styles.chatInput}
          placeholder="Send a message..."
        />
        <button type="submit" className={styles.sendButton}>
          <AiOutlineSend />
        </button>
      </form>
    </div>
  );
}
