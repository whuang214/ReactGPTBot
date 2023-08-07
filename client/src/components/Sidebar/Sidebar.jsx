import { useState, useEffect } from "react";

import SidebarChat from "./SidebarChat";
import chatService from "../../utils/chatService";

import { FaPlus } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

import styles from "./Sidebar.module.css";
import scrollingStyles from "./SidebarScrolling.module.css";

export default function Sidebar({
  user,
  onLogout,
  currentChat,
  setCurrentChat,
}) {
  const [chats, setChats] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  async function getChats() {
    const chats = await chatService.getAllChats();
    setChats(chats);
  }

  useEffect(() => {
    getChats();
  }, [currentChat]);

  function toggleDeleteConfirmation() {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  }

  async function handleDeleteChat() {
    await chatService.deleteChat(currentChat._id);
    setCurrentChat(null);
    setShowDeleteConfirmation(false);
  }

  return (
    <nav className={styles.sidebar}>
      <button
        onClick={() => setCurrentChat(null)}
        className={styles.addChatButton}
      >
        <FaPlus /> New Chat
      </button>
      <div className={`${styles.chatHistory} ${scrollingStyles.chatHistory}`}>
        {chats.map((chat) => (
          <SidebarChat
            key={chat._id}
            chat={chat}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            onDeleteIconClick={toggleDeleteConfirmation}
          />
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
              <button
                className={styles.cancelButton}
                onClick={toggleDeleteConfirmation}
              >
                Cancel
              </button>
              <button
                className={styles.deleteButton}
                onClick={handleDeleteChat}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
