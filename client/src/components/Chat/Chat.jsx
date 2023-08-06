import styles from "./Chat.module.css";

import Message from "../Message/Message";

export default function Chat() {
  return (
    <div className={styles.chatContainer}>
      <Message />
    </div>
  );
}
