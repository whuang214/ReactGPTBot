import { useState, useEffect } from "react";

import { FaPlus } from "react-icons/fa";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  // fetch all chats from the database
  // display them in the sidebar

  return (
    <nav className={styles.sidebar}>
      <button className={styles.addChatButton}>
        <FaPlus /> New Chat
      </button>
      <div className={styles.chatHistory}>
        <a className={styles.conversationSelected}>Primary Chat</a>
        <a className={styles.conversation}>Old Chat</a>
      </div>
    </nav>
  );
}
