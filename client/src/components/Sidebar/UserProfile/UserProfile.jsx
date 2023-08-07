import { useState } from "react";

import OptionsPopup from "../../OptionsPopup/OptionsPopup";

import { SlOptions } from "react-icons/sl";

import styles from "./UserProfile.module.css";

export default function UserProfile({ user }) {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleContainerClick = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div className={styles.userProfileContainer}>
      {isPopupOpen && <OptionsPopup />}
      <button
        onClick={handleContainerClick}
        className={`${styles.containerButton} ${
          isPopupOpen ? styles.containerButtonSelected : ""
        }`}
      >
        <div className={styles.avatarContainer}>
          <img
            className={styles.userAvatar}
            src="https://via.placeholder.com/30"
            alt="User"
          />
        </div>
        <div className={styles.userEmail}>{user.email}</div>
        <div className={styles.optionsButton}>
          <SlOptions />
        </div>
      </button>
    </div>
  );
}
