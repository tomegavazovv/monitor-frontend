import React, { useState } from "react";
import styles from "./Pricing.module.css";
import ToggleButton from "./ToggleButton/ToggleButton";
import checkImage from "../../../assets/check_pricing.svg";
import CtaButton from "../CtaButton/CtaButton";

const Pricing = () => {
  const [buttonValue, setButtonValue] = useState(false);
  console.log(buttonValue)
  return (
    <div className={styles.container}>
      <p className={styles.title}>Pricing</p>
      <p className={styles.subtitle}>
        We offer one “Universal” plan designed to help you streamline your
        LinkedIn experience and boost your productivity, with the flexibility of
        monthly or annual subscriptions.
      </p>
      <div className={styles.billing_options}>
        <span>Bill Monthly</span>
        <ToggleButton toggleButton={() => setButtonValue(prev => !prev)} />
        <span>Bill Annually</span>
        <div className={styles.discount_container}>
          <span>Save 25%</span>
        </div>
      </div>
      <div className={styles.card}>
        <p className={styles.card_title}>Universal</p>
        <div className={styles.card_item}>
          <img width={"10px"} src={checkImage} alt="" />
          <span>
            Up to <strong>1000</strong> people in the lists
          </span>
        </div>
        <div className={styles.card_item}>
          <img width={"10px"} src={checkImage} alt="" />
          <span>Monthy and annual subscription options</span>
        </div>
        <div className={styles.card_item}>
          <img width={"10px"} src={checkImage} alt="" />
          <span>Up to 100 different lists</span>
        </div>
        <div className={styles.card_item}>
          <img width={"10px"} src={checkImage} alt="" />
          <span>Engagement Report</span>
        </div>

        <div className={styles.cta}>
          <span>
            $
            <strong style={{ fontSize: "22px" }}>
              {buttonValue ? "14.99" : "19.99"}
            </strong>{" "}
            /month
          </span>
          <CtaButton />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
