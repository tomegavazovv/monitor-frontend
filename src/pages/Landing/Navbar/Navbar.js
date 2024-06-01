import React from 'react'
import styles from './Navbar.module.css'
import logo from '../../../assets/logo_text.svg'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
        <div className={styles.content}>
        <div className={styles.logo}>
            <img width={'100px'} src={logo} alt='dexra logo'/>
        </div>
        <div className={styles.links}>
          <a className={styles.link} href='#features'>Features</a>
          <a className={styles.link} href='#pricing'>Pricing</a>
          <a className={styles.link} href='#.com'>Contact</a>
          </div>
        <div className={styles.actions}>
          <div>
            <div className={styles.link + ' ' + styles.login} onClick={() => navigate('login')}>Login</div>
          </div>
          <div>
            <button className={styles.cta_button_nav} onClick={() => navigate('login')}>Start for free</button>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Navbar