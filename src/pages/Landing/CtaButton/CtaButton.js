import React from 'react'
import styles from './CtaButton.module.css'
import { useNavigate } from 'react-router-dom'

const CtaButton = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.cta_headline}>
          <button className={styles.cta_button} onClick={() => navigate('login')}>Start for free</button>
          <p className={styles.cc}>
            1-month free trial, no credit card required
          </p>
        </div>
  )
}

export default CtaButton