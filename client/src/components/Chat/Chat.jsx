import Message from "../Message/Message";
import styles from "./Chat.module.css";
import scrollStyles from "./ChatScroll.module.css"; // Update the import for scrollbar styles

export default function Chat({ currentChat }) {
  return (
    <div className={`${styles.chatContainer} ${scrollStyles.chatContainer}`}>
      {" "}
      {/* Add the scrollStyles here */}
      {currentChat.messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
    </div>
  );
}
