import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <button className={styles.addChatButton}>Add New Chat</button>
    </div>
  );
}
