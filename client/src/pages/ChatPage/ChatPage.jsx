import { useState, useEffect } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import NewChat from "../../components/Chat/NewChat";
import Chat from "../../components/Chat/Chat";

import styles from "./ChatPage.module.css";

export default function ChatPage() {
  // current chat is stored in state
  // if null then display new chat component

  return (
    <div className={styles.chatContainer}>
      <Sidebar />
      <NewChat />
    </div>
  );
}
