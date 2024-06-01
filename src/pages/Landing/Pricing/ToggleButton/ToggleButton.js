import React from "react";
import styles from './ToggleButton.module.css'

const ToggleButton = ({toggleButton}) => {
  return (
    <div>
      <label className={styles.switch}>
        <input type="checkbox" className={styles.input} onClick={toggleButton} />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default ToggleButton;
