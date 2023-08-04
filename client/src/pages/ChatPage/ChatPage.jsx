import { useState, useEffect } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import NewChat from "../../components/Chat/NewChat";
import Chat from "../../components/Chat/Chat";

import styles from "./ChatPage.module.css";

export default function ChatPage({ onLogout }) {
  const [currentChat, setCurrentChat] = useState(null); // chat id

  return (
    <div className={styles.chatContainer}>
      <Sidebar
        onLogout={onLogout}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />
      {currentChat ? <Chat /> : <NewChat />}
    </div>
  );
}
