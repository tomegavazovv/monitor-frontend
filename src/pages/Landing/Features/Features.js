import React from 'react'
import styles from './Features.module.css'
import showVideo from "../../../assets/show-list-final.mp4";
import manageVideo from "../../../assets/manage-final.mp4";

const Features = () => {
  return (
    <div className={styles.container}>
         <p className={styles.title}>How It Works</p>
          <div className={styles.feature_container}>
            <div className={styles.text_container}>
              <p className={styles.feature_title}>Custom Feed</p>
              <p className={styles.feature_text}>
                Effortlessly filter, view, and engage with posts from your
                curated lists. 100% safe and natively integrated with LinkedIn.
              </p>
            </div>
            <div className={styles.video_container}>
              <video className={styles.video} autoPlay muted loop>
                <source src={showVideo} type="video/mp4" />
              </video>
            </div>
          </div>
          <div className={styles.feature_container}>
            <div className={styles.video_container}>
              <video className={styles.video} autoPlay muted loop>
                <source src={manageVideo} type="video/mp4" />
              </video>
            </div>
            <div className={styles.text_container}>
              <p className={styles.feature_title}>Custom Lists</p>
              <p className={styles.feature_text}>
                Create and manage lists of people that are relevant to you.
                Import users through:
                <ul>
                  <li>Public URL</li>
                  <li>CSV</li>
                  <li>Directly from LinkedIn</li>
                </ul>
              </p>
            </div>
          </div>
    </div>
  )
}

export default Features