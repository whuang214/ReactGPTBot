import styles from "./OptionsPopup.module.css";

export default function OptionsPopup() {
  const handleOutsideClick = (event) => {
    // Check if the click is outside the container or the popup
    if (!event.target.closest(`.${styles.userProfileContainer}`)) {
      setPopupOpen(false);
    }
  };

  const handleOptionClick = (option) => {
    // Handle the click on the popup options
    console.log(option);
    setPopupOpen(false);
  };

  return (
    <div className={styles.popupMenu} onClick={handleOutsideClick}>
      <div
        className={styles.popupOption}
        onClick={() => handleOptionClick("Option 1")}
      >
        Option 1
      </div>
      <div
        className={styles.popupOption}
        onClick={() => handleOptionClick("Option 2")}
      >
        Option 2
      </div>
      <div
        className={styles.popupOption}
        onClick={() => handleOptionClick("Option 3")}
      >
        Option 3
      </div>
    </div>
  );
}
