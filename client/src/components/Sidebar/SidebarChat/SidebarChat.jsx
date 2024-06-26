import { useState, useRef, useEffect, useContext } from "react";
import { refreshChatContext } from "../Sidebar";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdChatBubbleOutline } from "react-icons/md";

import chatService from "../../../utils/chatService";

import styles from "./SidebarChat.module.css";

export default function SidebarChat({
  chat,
  currentChat,
  setCurrentChat,
  onDeleteIconClick,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [chatTitle, setChatTitle] = useState(chat.title);
  const isCurrentChat = chat._id === currentChat?._id;

  const chatRef = useRef(null);

  const { getChats } = useContext(refreshChatContext);

  // Set current chat when user clicks on chat
  async function handleChatClick() {
    const updatedChat = await chatService.getChat(chat._id);

    if (updatedChat.error) {
      console.error("Error getting chat:", updatedChat.error);
      return;
    }

    setCurrentChat(updatedChat);
  }

  // Open edit form when user clicks on edit icon
  function handleEditChatTitle(event) {
    event.preventDefault();
    if (isEditing) return;
    setIsEditing(true);
  }

  // Update chat title in db when user submits edit form
  async function handleTitleSubmit(event) {
    event.preventDefault();

    // update chat title locally
    setCurrentChat({ ...currentChat, title: chatTitle });
    // update chat title in db
    await chatService.renameChat(chat._id, { title: chatTitle });

    setIsEditing(false);
    getChats();
  }

  // Close edit form when clicking outside of it (dont save changes)
  useEffect(() => {
    function handleClickOutside(event) {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsEditing(false);
      }
    }

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  return (
    <div
      ref={chatRef}
      key={chat._id}
      className={
        isCurrentChat ? styles.conversationSelected : styles.conversation
      }
      onClick={handleChatClick}
    >
      <div className={styles.chatTitleContainer}>
        <MdChatBubbleOutline size={16} />
        {isEditing ? (
          <form onSubmit={handleTitleSubmit}>
            <input
              type="text"
              className={styles.chatTitleInput}
              value={chatTitle}
              onChange={(e) => setChatTitle(e.target.value)}
            />
          </form>
        ) : (
          chat.title
        )}
      </div>
      {isCurrentChat && (
        <div className={styles.iconContainer}>
          <button className={styles.editIcon} onClick={handleEditChatTitle}>
            <AiOutlineEdit size={17} />
          </button>
          <button
            className={styles.deleteIcon}
            onClick={() => onDeleteIconClick()}
          >
            <AiOutlineDelete size={17} />
          </button>
        </div>
      )}
    </div>
  );
}
