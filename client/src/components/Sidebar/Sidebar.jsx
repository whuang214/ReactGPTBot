import { useState, useEffect } from "react";

import chatService from "../../utils/chatService";

import { FaPlus } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdChatBubbleOutline } from "react-icons/md";
import { SlOptions } from "react-icons/sl";

import styles from "./Sidebar.module.css";

export default function Sidebar({
  user,
  onLogout,
  currentChat,
  setCurrentChat,
}) {
  const [chats, setChats] = useState([]);
  const [editingChatId, setEditingChatId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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

  function toggleDeleteConfirmation() {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  }

  async function handleDeleteChat() {
    // console.log("Delete: ", currentChat._id);
    await chatService.deleteChat(currentChat._id);
    setCurrentChat(null);
    setShowDeleteConfirmation(false);
  }

  function handleEditChatTitle(event, chatId) {
    event.preventDefault();
    console.log("Editing: ", chatId);
    //todo implement editing chat title
    if (editingChatId === chatId) {
      setEditingChatId(null); // deselect editting chat
    } else {
      setEditingChatId(chatId);
    }
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
              {editingChatId === chat._id ? (
                <input
                  className={styles.chatTitleInput}
                  type="text"
                  value={chat.title}
                  onChange={(e) => handleTitleChange(e, chat._id)}
                  onBlur={() => saveChatTitle(chat._id)}
                />
              ) : (
                chat.title
              )}
            </div>
            {chat._id === currentChat?._id && (
              <div className={styles.iconContainer}>
                <button
                  className={styles.editIcon}
                  onClick={(event) => handleEditChatTitle(event, chat._id)}
                >
                  <AiOutlineEdit size={17} />
                </button>
                <button
                  className={styles.deleteIcon}
                  onClick={toggleDeleteConfirmation}
                >
                  <AiOutlineDelete size={17} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.userProfileContainer}>
        <div className={styles.avatarContainer}>
          <img
            className={styles.userAvatar}
            src="https://via.placeholder.com/30"
            alt="User"
          />
        </div>
        <div className={styles.userEmail}>{user.email}</div>
        <div className={styles.optionsButton}>
          <button className={styles.threeDotsButton}>
            <SlOptions />
          </button>
        </div>
      </div>
      {showDeleteConfirmation && (
        <div className={styles.confirmationOverlay}>
          <div className={styles.confirmationPopup}>
            <h2>Delete Chat?</h2>
            <div
              style={{
                borderBottom: "1px solid #4d4d4f",
              }}
            ></div>
            <p>
              Are you sure you want to delete{" "}
              <strong>{currentChat.title}</strong>?
            </p>
            <div className={styles.buttonsContainer}>
              <button onClick={handleDeleteChat}>Yes</button>
              <button onClick={toggleDeleteConfirmation}>No</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
