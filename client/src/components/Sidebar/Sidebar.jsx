import styles from "./Sidebar.module.css";
import { FaPlus } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <button className={styles.addChatButton}>
        <FaPlus /> New Chat
      </button>
    </div>
  );
}
