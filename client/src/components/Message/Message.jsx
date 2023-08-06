import styles from "../Message/Message.module.css";

// Placeholder avatars
const userAvatar = "https://via.placeholder.com/30";
const botAvatar = "https://via.placeholder.com/30";

export default function Message({ message }) {
  const sender = message.role;
  const content = message.content;

  return (
    <div
      className={`${styles.messageContainer} ${
        sender === "user" ? styles.userMessage : styles.botMessageContainer
      }`}
    >
      <img
        src={sender === "user" ? userAvatar : botAvatar}
        alt={`${sender}'s avatar`}
        className={styles.avatar}
      />
      <span className={styles.message}>{content}</span>
    </div>
  );
}
