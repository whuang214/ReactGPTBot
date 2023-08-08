import styles from "../Message/Message.module.css";
import ReactMarkdown from "react-markdown";

const botAvatar = "/botIcon.png";

export default function Message({ userPhoto, message }) {
  const sender = message.role;
  const content = message.content;

  return (
    <div
      className={
        sender === "assistant"
          ? styles.botMessageWrapper
          : styles.messageWrapper
      }
    >
      <div className={styles.messageContainer}>
        <img
          src={sender === "assistant" ? botAvatar : userPhoto}
          alt={`${sender}'s avatar`}
          className={styles.avatar}
        />
        <ReactMarkdown className={styles.message}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
