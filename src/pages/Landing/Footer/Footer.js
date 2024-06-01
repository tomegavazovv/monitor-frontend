import React from 'react'
import styles from './Footer.module.css'
import logo from '../../../assets/logo_text.svg'

const Footer = () => {
  return (
    <div className={styles.container}>
        {/* <div className={styles.logo_container}> 
            <img width={'150px'} src={logo} alt=''/>
        </div> */}
        <div className={styles.info}>
            <p className={styles.text_info}>@ 2024 Dexra. All rights reserved.</p>
            <p className={styles.text_info}>support@dexra.co</p>
        </div>
    </div>
  )
}

export default Footer