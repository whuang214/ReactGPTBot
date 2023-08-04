import { useState, useEffect } from "react";

import chatService from "../../utils/chatService";

import { FaPlus } from "react-icons/fa";
import styles from "./Sidebar.module.css";

export default function Sidebar({ onLogout, currentChat, setCurrentChat }) {
  const [chats, setChats] = useState([]);

  async function getChats() {
    const chats = await chatService.getAllChats();
    setChats(chats);
  }

  useEffect(() => {
    getChats();
  }, []);

  function handleChatClick(chat) {
    console.log(chat);
    chat ? setCurrentChat(chat) : setCurrentChat(null);
  }

  return (
    <nav className={styles.sidebar}>
      <button
        onClick={() => handleChatClick(null)}
        className={styles.addChatButton}
      >
        <FaPlus /> New Chat
      </button>
      <div className={styles.chatHistory}>
        {chats.map((chat) => (
          <button
            key={chat._id}
            className={
              chat._id === currentChat
                ? styles.conversationSelected
                : styles.conversation
            }
            onClick={() => handleChatClick(chat)}
          >
            {chat.title}
          </button>
        ))}
        {/* <a className={styles.conversationSelected}>Primary Chat</a>
        <a className={styles.conversation}>Old Chat</a> */}
      </div>
    </nav>
  );
}
