import React, { useEffect, useState } from 'react'
import styles from './Sidebar.module.css'
import listsImg from '../../assets/Bookmark.svg'
import settingsImg from '../../assets/Cog.svg'
import billingImg from '../../assets/Credit Card.svg'
import profileImg from '../../assets/User.svg'
import supportImg from '../../assets/support.svg'
import demoImg from '../../assets/demo.svg'
import logoutImg from '../../assets/Logout.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../provider/authProvider'
import dispatchEvent from '../../utils/dispatchEvent'

const Sidebar = () => {
	const [activeItem, setActiveItem] = useState('')
	const location = useLocation()
	const navigate = useNavigate()
	const { setToken } = useAuth()

	const handleLogout = () => {
		setToken()
		dispatchEvent('userLoggedOut')
		navigate('/login', { replace: true })
	}

	useEffect(() => {
		if (location.pathname.includes('feed')) {
			setActiveItem('feed')
		} else if (location.pathname.includes('lists')) {
			setActiveItem('lists')
		}
	}, [location.pathname])

	const handleClick = (item) => {
		if (item === 'feed' && item !== activeItem) {
			navigate('/feed')
			setActiveItem(item)
		}
		if (item === 'lists' && item !== activeItem) {
			navigate('/home/lists')
			setActiveItem(item)
		}
		// if (item === 'profile' && item !== activeItem) navigate('/profile')
		// if (item === 'billing' && item !== activeItem) navigate('/billing')
		// if (item === 'settings' && item !== activeItem) navigate('/settings')
	}

	return (
		<div className={styles.sidebar}>
			<div className={styles.main_items}>
				{/* <div
					className={`${styles.sidebar_item} ${
						activeItem === 'feed' ? styles.active_item : ''
					}`}
					onClick={() => handleClick('feed')}>
					<img className={styles.item_image} src={feedImg} alt='Feed' />
					<p>Feed</p>
				</div> */}
				<div
					className={`${styles.sidebar_item} ${
						activeItem === 'lists' ? styles.active_item : ''
					}`}
					onClick={() => handleClick('lists')}>
					<img src={listsImg} alt='Lists' />
					<p>Lists</p>
				</div>
				<div className={`${styles.sidebar_item} ${styles.disabled}`}>
					<img src={profileImg} alt='Profile' />
					<p>Profile</p>
				</div>
				<div
					className={`${styles.sidebar_item} ${styles.disabled}`}
					onClick={() => handleClick('billing')}>
					<img src={billingImg} alt='Billing' />
					<p>Billing</p>
				</div>
				<div
					className={`${styles.sidebar_item} ${styles.disabled}`}
					onClick={() => handleClick('settings')}>
					<img src={settingsImg} alt='Settings' />
					<p>Settings</p>
				</div>
			</div>
			<div className={styles.support_items}>
				<div className={styles.sidebar_item + ' ' + styles.demo}>
					<img
						style={{ width: '19px', paddingLeft: '14px', marginRight: '1px' }}
						src={demoImg}
						alt='Support'
					/>
					<p>Quick Demo</p>
				</div>
				<div className={styles.sidebar_item + ' ' + styles.contact_support}>
					<img src={supportImg} alt='Support' />
					<p>Contact Support</p>
				</div>
				<div className={styles.sidebar_item + ' ' + styles.logout} onClick={handleLogout}>
					<img src={logoutImg} alt='Logout' />
					<p>Logout</p>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
