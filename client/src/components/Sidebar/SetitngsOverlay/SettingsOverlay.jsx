import styles from "./SettingsOverlay.module.css";

export default function SettingsOverlay({
  toggleOptionsPopup,
  onLogout,
  handleDeleteAllChats,
  handleEditUser,
}) {
  return (
    <div className={styles.confirmationOverlay}>
      <div className={styles.confirmationPopup}>
        <h2>Settings</h2>
        <div
          style={{
            borderBottom: "1px solid #4d4d4f",
          }}
        ></div>
        <p>Here are your options:</p>
        <div className={styles.buttonsContainer}>
          <button className={styles.cancelButton} onClick={handleEditUser}>
            Edit User
          </button>
          <button
            className={styles.deleteButton}
            onClick={handleDeleteAllChats}
          >
            Clear Chats
          </button>
          <button className={styles.logoutButton} onClick={onLogout}>
            Logout
          </button>
          <button className={styles.cancelButton} onClick={toggleOptionsPopup}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
