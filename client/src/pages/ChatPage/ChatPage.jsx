import Sidebar from "../../components/Sidebar/Sidebar";
import NewChat from "../../components/NewChat/NewChat";
import styles from "./ChatPage.module.css";

export default function ChatPage() {
  return (
    <div className={styles.chatContainer}>
      <Sidebar />
      <NewChat />
    </div>
  );
}
