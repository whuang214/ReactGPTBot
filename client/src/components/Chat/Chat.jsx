import { UserContext } from "../../App";
import { useContext } from "react";

import Message from "../Message/Message";

import styles from "./Chat.module.css";
import scrollStyles from "./ChatScroll.module.css"; // Update the import for scrollbar styles

export default function Chat({ currentChat }) {
  const { user } = useContext(UserContext);

  return (
    <div className={`${styles.chatContainer} ${scrollStyles.chatContainer}`}>
      {" "}
      {/* Add the scrollStyles here */}
      {currentChat.messages.map((msg, index) => (
        <Message userPhoto={user.photoUrl} key={index} message={msg} />
      ))}
    </div>
  );
}
