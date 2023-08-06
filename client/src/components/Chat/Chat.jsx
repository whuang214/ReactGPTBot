import { useState, useEffect } from "react";

import Message from "../Message/Message";
import styles from "./Chat.module.css";

export default function Chat({ currentChat }) {
  return (
    <div className={styles.chatContainer}>
      {currentChat.messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
    </div>
  );
}
