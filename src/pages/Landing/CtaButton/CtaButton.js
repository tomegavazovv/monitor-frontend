import React from 'react'
import styles from './CtaButton.module.css'

const CtaButton = () => {
  return (
    <div className={styles.cta_headline}>
          <button className={styles.cta_button}>Start for free</button>
          <p className={styles.cc}>
            14-day free trial, no credit card required
          </p>
        </div>
  )
}

export default CtaButton