import styles from "../Message/Message.module.css";
import ReactMarkdown from "react-markdown";

const userAvatar = "https://via.placeholder.com/30";
const botAvatar = "/botIcon.png";

export default function Message({ message }) {
  const sender = message.role;
  const content = message.content;

  return (
    <div
      className={`${styles.messageContainer} ${
        sender === "assistant" ? styles.botMessageContainer : styles.userMessage
      }`}
    >
      <img
        src={sender === "assistant" ? botAvatar : userAvatar}
        alt={`${sender}'s avatar`}
        className={styles.avatar}
      />
      <ReactMarkdown className={styles.message}>{content}</ReactMarkdown>
    </div>
  );
}
