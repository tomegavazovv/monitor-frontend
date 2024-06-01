import React, { useState } from "react";
import styles from "./Question.module.css";
import plusImage from "../../../../assets/plus.svg";
import minusImage from "../../../../assets/minus.svg";

const Question = ({ question, answer }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className={styles.item}>
      <div className={styles.headline}>
        <p className={styles.question}>{question}</p>
        <div width={'30px'} style={{marginLeft: '30px'}} onClick={() => setClicked(prev => !prev)} className={`${styles.icon_container} ${clicked ? styles.clicked : ''}`}>
          <img width={"15px"} src={clicked ? minusImage : plusImage} alt="" />
        </div>
      </div>
      {clicked && <p className={styles.answer}>{answer}</p> }
      
    </div>
  );
};

export default Question;
