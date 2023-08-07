import React from "react";
import { Button } from "antd";
import styles from "./WelcomePage.module.css";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className={styles.centeredContainer}>
      <div className={styles.title}>Welcome to ReactGPTBot</div>
      <div className={styles.subtitle}>By William Huang</div>
      <div className={styles.instructions}>
        Please log in with an account to proceed
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          type="ghost"
          onClick={handleLoginClick}
        >
          Login
        </Button>
        <Button
          className={styles.button}
          type="ghost"
          onClick={handleRegisterClick}
        >
          Register
        </Button>
      </div>
    </div>
  );
}
