import React from "react";
import styles from "./ForSection.module.css";
import socialSellerIcon from "../../../assets/ss.svg";
import clearFeedIcon from "../../../assets/cf.svg";
import agencyIcon from "../../../assets/as.svg";
import creatorIcon from "../../../assets/fc.svg";

const ForSection = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Upgrade Your</p>
      <p className={styles.title}>LinkedIn Experience</p>
      <div className={styles.row}>
        <div className={styles.section_container}>
          <img
            src={socialSellerIcon}
            style={{ top: "-50px" }}
            className={styles.section_icon}
            alt=""
          />
          <p className={styles.section_title}>For social sellers</p>
          <p className={styles.section_text}>
            Maximize your sales efforts by focusing on interactions with key
            prospects and clients
          </p>
        </div>
        <div className={styles.section_container}>
          <img
            src={creatorIcon}
            style={{ top: "-25px" }}
            className={styles.section_icon}
            alt=""
          />
          <p className={styles.section_title}>For creators</p>
          <p className={styles.section_text}>
            Build your audience through engaging with the right people in a
            single place
          </p>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.section_container}>
          <img
            src={agencyIcon}
            style={{ top: "-45px" }}
            className={styles.section_icon}
            alt=""
          />
          <p className={styles.section_title}>For agencies and sales teams</p>
          <p className={styles.section_text}>
            Streamline your workflow by creating lists for different clients,
            campaigns, or influencers.
          </p>
        </div>
        <div className={styles.section_container}>
          <img
            src={clearFeedIcon}
            style={{ top: "-45px" }}
            className={styles.section_icon}
            alt=""
          />
          <p className={styles.section_title}>For clear feed seekers</p>
          <p className={styles.section_text}>
            Stop browsing through the endless LinkedIn noise. Engage with all your favorite people at one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForSection;
