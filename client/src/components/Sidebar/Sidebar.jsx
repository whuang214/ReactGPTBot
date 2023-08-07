import { useState, useEffect } from "react";

import SidebarChatList from "./SidebarChatList/SidebarChatList";
import UserProfile from "./UserProfile/UserProfile";
import DeleteOverlay from "./DeleteOverlay/DeleteOverlay";
import SettingsOverlay from "./SetitngsOverlay/SettingsOverlay";

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
  const [showOptions, setShowOptions] = useState(false);

  async function getChats() {
    const chats = await chatService.getAllChats();
    setChats(chats);
  }

  useEffect(() => {
    getChats();
  }, [currentChat]);

  function toggleOptionsPopup() {
    setShowOptions(!showOptions);
  }

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

      <UserProfile user={user} onOptionsClick={toggleOptionsPopup} />

      {showDeleteConfirmation && (
        <DeleteOverlay
          currentChat={currentChat}
          toggleDeleteConfirmation={toggleDeleteConfirmation}
          handleDeleteChat={handleDeleteChat}
        />
      )}

      {showOptions && (
        <SettingsOverlay
          handleEditUser={handleEditUser}
          handleDeleteAllChats={handleDeleteAllChats}
          onLogout={onLogout}
          toggleOptionsPopup={toggleOptionsPopup}
        />
      )}
    </nav>
  );
}
