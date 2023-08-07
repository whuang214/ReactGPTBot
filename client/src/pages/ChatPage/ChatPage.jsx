import { useState, useEffect, useContext } from "react";

import { UserContext } from "../../App";

import Sidebar from "../../components/Sidebar/Sidebar";
import NewChat from "../../components/Chat/NewChat";
import Chat from "../../components/Chat/Chat";
import ChatInput from "../../components/Chat/ChatInput";

import styles from "./ChatPage.module.css";

export default function ChatPage() {
  const { user, handleLogout } = useContext(UserContext);
  const [currentChat, setCurrentChat] = useState(null); // chat object

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        user={user}
        onLogout={handleLogout}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />
      <div className={styles.chatContainer}>
        {currentChat ? <Chat currentChat={currentChat} /> : <NewChat />}
        <ChatInput currentChat={currentChat} setCurrentChat={setCurrentChat} />
      </div>
    </div>
  );
}
