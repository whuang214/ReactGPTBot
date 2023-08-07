import { useState, useEffect } from "react";

import SidebarChatList from "./SidebarChatList/SidebarChatList";
import UserProfile from "./UserProfile/UserProfile";
import ConfimationOverlay from "../ConfirmationOverlay/ConfirmationOverlay";

import chatService from "../../utils/chatService";

import { FaPlus } from "react-icons/fa";

import styles from "./Sidebar.module.css";

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

  async function handleDeleteAllChats() {}

  function handleEditUser() {}

  return (
    <nav className={styles.sidebar}>
      <button
        onClick={() => setCurrentChat(null)}
        className={styles.addChatButton}
      >
        <FaPlus /> New Chat
      </button>

      <SidebarChatList
        chats={chats}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        onDeleteIconClick={toggleDeleteConfirmation}
      />

      <UserProfile user={user} onLogout={onLogout} />

      {showDeleteConfirmation && (
        <ConfimationOverlay
          title="Delete Chat?"
          prompt={
            <>
              Are you sure you want to delete{" "}
              <strong>
                <em>{currentChat.title}</em>
              </strong>
              ?
            </>
          }
          onCancel={toggleDeleteConfirmation}
          onConfirm={handleDeleteChat}
        />
      )}
    </nav>
  );
}
