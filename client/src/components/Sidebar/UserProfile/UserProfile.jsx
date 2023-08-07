import styles from "./UserProfile.module.css";

import { SlOptions } from "react-icons/sl";

export default function UserProfile({ user, onOptionsClick }) {
  return (
    <div className={styles.userProfileContainer}>
      <div className={styles.avatarContainer}>
        <img
          className={styles.userAvatar}
          src="https://via.placeholder.com/30"
          alt="User"
        />
      </div>
      <div className={styles.userEmail}>{user.email}</div>
      <div className={styles.optionsButton}>
        <button onClick={onOptionsClick} className={styles.threeDotsButton}>
          <SlOptions />
        </button>
      </div>
    </div>
  );
}
