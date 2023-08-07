import styles from "./OptionsPopup.module.css";

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
      <div className={styles.popupOption}>Edit User</div>
      <div className={styles.popupOption}>Clear Chats</div>
      <div className={styles.seperator}></div>
      <div className={styles.popupOption} onClick={onLogout}>
        Logout
      </div>
    </div>
  );
}
