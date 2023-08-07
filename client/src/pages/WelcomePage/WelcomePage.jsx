import React from "react";
import { Button } from "antd";
import styles from "./WelcomePage.module.css";

export default function WelcomePage() {
  return (
    <div className={styles.centeredContainer}>
      <div className={styles.title}>Welcome to ReactGPTBot</div>
      <div className={styles.subtitle}>By William Huang</div>
      <div className={styles.instructions}>
        Please log in with an account to proceed
      </div>
      <div className={styles.buttonContainer}>
        <Button className={styles.button} type="ghost" href="/login">
          Login
        </Button>
        <Button className={styles.button} type="ghost" href="/register">
          Register
        </Button>
      </div>
    </div>
  );
}
