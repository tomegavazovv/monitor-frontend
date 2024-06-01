import React from 'react'
import styles from './Headline.module.css'
import CtaButton from '../CtaButton/CtaButton'

const Headline = () => {
  return (
    <div>
    <div className={styles.container}>
          <h1 className={styles.headline}>Engage with Your Relevant</h1>
          <h1 className={styles.headline}>
            <span style={{ color: "#0A66C2" }}>LinkedIn</span> Users In One
            Place
          </h1>
        </div>
        <div className={styles.subheadline_container}>
          <p className={styles.subheadline}>
            Stop Wasting Your Time Browsing Through LinkedIn.
          </p>
          <p className={styles.subheadline}>
            Build Custom Lists of People and Engage With Their Posts Instantly.
          </p>
        </div>
        <div style={{ marginTop: "3.5rem" }}>
          <CtaButton />
        </div>
        </div>
  )
}

export default Headline