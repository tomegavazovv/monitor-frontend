import React from "react";
import styles from "./Testimonials.module.css";
import navodnici from "../../../assets/navodnici.svg";
import Stars from "./Stars";
import paul from "../../../assets/Paul Skotidas.png";
import denis from "../../../assets/Denis Zekic.png";
import nick from "../../../assets/Nick Raejburn.png";

const Testimonials = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <p className={styles.title}>
            What Our <span style={{color: '#0966C2'}}>Community</span> Says About Us
          </p>
        </div>
        <div className={styles.testimonials_container}>
          <div className={styles.testimonial}>
            <div className={styles.image_container}>
              <img className={styles.image} src={paul} alt="" />
              <div className={styles.navodnici_container}>
                <img height="15px" width="15px" src={navodnici} />
              </div>
            </div>
            <div className={styles.stars_container}>
              <Stars />
            </div>

            <p className={styles.text}>
              "Dexra has made my daily LinkedIn activities so much more
              productive. I can now engage with my prospects and key connections
              without getting distracted by unrelated content, which has greatly
              enhanced my social selling results."
            </p>
            <p className={styles.author_name}>Paul Skotidas</p>
            <p className={styles.field}>LinkedIn Social Selling Strategist</p>
          </div>
          <div className={styles.testimonial}>
            <div className={styles.image_container}>
              <img className={styles.image} src={denis} alt="" />
              <div className={styles.navodnici_container}>
                <img height="15px" width="15px" src={navodnici} />
              </div>
            </div>
            <div className={styles.stars_container}>
              <Stars />
            </div>

            <p className={styles.text}>
              "Dexra is a fantastic tool for generating B2B leads on LinkedIn.
              It allows me to efficiently track and engage with potential leads,
              ensuring I never miss an opportunity to connect with the right
              people."
            </p>
            <p className={styles.author_name}>Denis Zekic</p>
            <p className={styles.field}>B2B Leads on LinkedIn</p>
          </div>
          <div className={styles.testimonial}>
            <div className={styles.image_container}>
              <img className={styles.image} src={nick} alt="" />
              <div></div>

              <div className={styles.navodnici_container}>
                <img height="15px" width="15px" src={navodnici} />
              </div>
            </div>
            <div className={styles.stars_container}>
              <Stars />
            </div>

            <p className={styles.text}>
              "With Dexra, my LinkedIn feed is no longer a mess. I can easily
              see updates from the people who matter most to my business, saving
              me time and keeping me productive."
            </p>
            <p className={styles.author_name}>Nick Raeburn</p>
            <p className={styles.field}>Entrepreneur</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
