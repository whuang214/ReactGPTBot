import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdChatBubbleOutline } from "react-icons/md";

import chatService from "../../utils/chatService";

import styles from "./Sidebar.module.css";

export default function SidebarChat({
  chat,
  currentChat,
  setCurrentChat,
  onDeleteIconClick,
}) {
  const isCurrentChat = chat._id === currentChat?._id;

  async function handleChatClick() {
    const updatedChat = await chatService.getChat(chat._id);

    if (updatedChat.error) {
      console.error("Error getting chat:", updatedChat.error);
      return;
    }

    setCurrentChat(updatedChat);
  }

  function handleEditChatTitle(event) {
    event.preventDefault();
    // your edit chat logic here
  }

  return (
    <div
      key={chat._id}
      className={
        isCurrentChat ? styles.conversationSelected : styles.conversation
      }
      onClick={handleChatClick}
    >
      <div className={styles.chatTitleContainer}>
        <MdChatBubbleOutline size={16} />
        {chat.title}
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
