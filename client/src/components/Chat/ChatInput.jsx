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

    let chat;
    if (!currentChat) {
      // Assuming the startChat creates a new chat and returns its details
      const result = await chatService.startChat("New Chat");

      if (result.error) {
        console.error("Error starting chat:", result.error);
        return;
      }

      chat = result;
      setCurrentChat(chat); // Set the newly created chat as the current one
    } else {
      chat = currentChat;
    }

    console.log("Chat:", chat);

    // Now you can call another function to add the message to the newly created chat or current chat
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
