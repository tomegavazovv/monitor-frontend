import React from "react";
import styles from "./FAQ.module.css";
import Question from "./Question/Question";

const FAQ = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Frequently Asked Questions</p>
      <div className={styles.wrapper}>
        <div className={styles.column}>
          <div className={styles.item}>
            <Question
              question={"Is Dexra safe?"}
              answer={
                "Dexra does minimal automations. We have tested the tool and it's 100% safe. The posts are shown and filtered natively on LinkedIn."
              }
            />
          </div>
          <div className={styles.item}>
            <Question
              question={"Can I bulk upload users to my lists?"}
              answer={
                "Yes. You can do it only through a CSV file for now. But soon it will be possible to upload users through sales navigator etc."
              }
            />
          </div>
          <div className={styles.item}>
            <Question
              question={
                "How is Dexra different from all the tools on the market?"
              }
              answer={
                "Dexra is the only tool that displays the posts natively on LinkedIn, and we also don't have limits on number of monitored users."
              }
            />
          </div>
          {/* <div className={styles.item}>
            <Question
              question={"Is Dexra safe for my LinkedIn account?"}
              answer={
                "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor"
              }
            />
          </div> */}
        </div>
        <div className={styles.column}>
          {/* <div className={styles.item}>
            <Question
              question={"Can I use Dexra on mutliple devices?"}
              answer={
                "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor"
              }
            />
          </div> */}
          <div className={styles.item}>
            <Question
              question={
                "Do I need LinkedIn premium or Sales Navigator subscription to be able to use Dexra?"
              }
              answer={
                "No, you can use any Dexra's feature whether or not you are subscribed to LinkedIn Premium or Sales Navigator."
              }
            />
          </div>
          <div className={styles.item}>
            <Question
              question={
                "How can I add users in my lists?"
              }
              answer={
                "You can do it through LinkedIn Profile Url, CSV file, or directly on LinkedIn upon visiting a certain profile."
              }
            />
          </div>
          <div className={styles.item}>
            <Question
              question={"Where can I request a feature?"}
              answer={
                "Book a calendly link here: calendly_link"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
