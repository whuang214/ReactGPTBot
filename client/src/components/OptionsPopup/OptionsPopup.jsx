import styles from "./OptionsPopup.module.css";

import { AiOutlineUser, AiOutlineClear } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";

export default function OptionsPopup({ isPopupOpen, setPopupOpen, onLogout }) {
  const handleOutsideClick = (event) => {
    // Check if the click is outside the container or the popup
    if (!event.target.closest(`.${styles.userProfileContainer}`)) {
      setPopupOpen(false);
    }
  };

  return (
    <div
      className={`${styles.popupMenu} ${isPopupOpen ? styles.active : ""}`}
      onClick={handleOutsideClick}
    >
      <div className={styles.popupOption}>
        <AiOutlineUser /> Edit User
      </div>
      <div className={`${styles.popupOption} ${styles.clearChatButton}`}>
        <AiOutlineClear /> Clear Chats
      </div>
      <div className={styles.seperator}></div>
      <div className={styles.popupOption} onClick={onLogout}>
        <MdOutlineLogout />
        Logout
      </div>
    </div>
  );
}
