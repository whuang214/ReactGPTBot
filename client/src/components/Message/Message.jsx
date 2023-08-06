import styles from "../Message/Message.module.css";

export default function Message({ message }) {
  return (
    <div
      className={`${styles.message} ${
        message.sender === "user" ? styles.userMessage : styles.botMessage
      }`}
    >
      {message.content}
    </div>
  );
}
