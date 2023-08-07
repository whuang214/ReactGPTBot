import styles from "./Chat.module.css";

export default function NewChat() {
  return (
    <div className={styles.newChat}>
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "2rem",
          color: "white",
          marginBottom: "20vh",
        }}
      >
        ReactGPTBot
      </h1>
    </div>
  );
}
