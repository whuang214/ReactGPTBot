import { useState, useEffect } from "react";

import chatService from "../../utils/chatService";

import { FaPlus } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdChatBubbleOutline } from "react-icons/md";

import styles from "./Sidebar.module.css";

export default function Sidebar({ onLogout, currentChat, setCurrentChat }) {
  const [chats, setChats] = useState([]);

  async function getChats() {
    const chats = await chatService.getAllChats();
    setChats(chats);
  }

  useEffect(() => {
    getChats();
  }, [currentChat]);

  async function handleChatClick(chat) {
    // fetch request single chat
    const updatedChat = await chatService.getChat(chat._id);

    if (updatedChat.error) {
      console.error("Error getting chat:", updatedChat.error);
      return;
    }

    setCurrentChat(updatedChat);
  }

  async function handleDeleteChat() {
    // console.log("Delete: ", currentChat._id);
    await chatService.deleteChat(currentChat._id);
    setCurrentChat(null);
  }
  function handleEditChatTitle() {
    console.log("Edit: ", currentChat._id);
  }

  return (
    <nav className={styles.sidebar}>
      <button
        onClick={() => setCurrentChat(null)}
        className={styles.addChatButton}
      >
        <FaPlus /> New Chat
      </button>
      <div className={styles.chatHistory}>
        {chats.map((chat) => (
          <div
            key={chat._id}
            className={
              chat._id === currentChat?._id
                ? styles.conversationSelected
                : styles.conversation
            }
            onClick={() => handleChatClick(chat)}
          >
            <div className={styles.chatTitleContainer}>
              <MdChatBubbleOutline size={16} />
              {chat.title}
            </div>
            {chat._id === currentChat?._id && (
              <div className={styles.iconContainer}>
                <button
                  className={styles.editIcon}
                  onClick={handleEditChatTitle}
                >
                  <AiOutlineEdit size={17} />
                </button>
                <button
                  className={styles.deleteIcon}
                  onClick={handleDeleteChat}
                >
                  <AiOutlineDelete size={17} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
