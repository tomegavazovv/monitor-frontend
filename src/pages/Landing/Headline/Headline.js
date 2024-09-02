import React from "react";
import styles from "./Headline.module.css";
import CtaButton from "../CtaButton/CtaButton";
import { useLocation } from "react-router-dom";

const Headline = () => {
  const location = useLocation()
  const clearFeed = location.pathname.includes('feed')
  
  return (
    <div>
      {clearFeed ? <><div className={styles.container}>
        <h1 className={styles.headline2}>Curate Your <span style={{ color: "#0A66C2" }}>LinkedIn</span> Feed</h1>
        
      </div>
      <div className={styles.subheadline_container2}>
        <p className={styles.subheadline2}>
          Cut Through the Noise and Focus On 
        </p>
        <p className={styles.subheadline2}>
          Your Relevant Connections
        </p>
      </div>
      <div style={{ marginTop: "3.5rem" }}>
        <CtaButton />
      </div></> : <><div className={styles.container}>
        <h1 className={styles.headline}>Engage with Your Relevant</h1>
        <h1 className={styles.headline}>
          <span style={{ color: "#0A66C2" }}>LinkedIn</span> Users In One Place
        </h1>
      </div>
      <div className={styles.subheadline_container}>
        <p className={styles.subheadline}>
          Stop Wasting Time Browsing Through LinkedIn.
        </p>
        <p className={styles.subheadline}>
          Build Custom Lists of People and Engage With Their Posts Instantly.
        </p>
      </div>
      <div style={{ marginTop: "3.5rem" }}>
        <CtaButton />
      </div></>}
    </div>
  );
};

export default Headline;
