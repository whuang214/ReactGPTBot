import styles from "./DeleteOverlay.module.css";

export default function ConfirmationOverlay({
  currentChat,
  toggleDeleteConfirmation,
  handleDeleteChat,
}) {
  return (
    <div className={styles.confirmationOverlay}>
      <div className={styles.confirmationPopup}>
        <h2>Delete Chat?</h2>
        <div
          style={{
            borderBottom: "1px solid #4d4d4f",
          }}
        ></div>
        <p>
          Are you sure you want to delete <strong>{currentChat.title}</strong>?
        </p>
        <div className={styles.buttonsContainer}>
          <button
            className={styles.cancelButton}
            onClick={toggleDeleteConfirmation}
          >
            Cancel
          </button>
          <button className={styles.deleteButton} onClick={handleDeleteChat}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
