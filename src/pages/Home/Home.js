import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import arrow from '../../assets/rightArrow.svg'
import styles from './Home.module.css'
import { Outlet } from 'react-router-dom'
import dispatchEvent from '../../utils/dispatchEvent'
import chromeImage from '../../assets/chrome.svg'

function Home() {
	const extensionInstalledStorage = localStorage.getItem('extensionInstalled') === 'true'
	const [extensionInstalled, setExtensionInstalled] = useState(extensionInstalledStorage)
	const [extensionResponseReceived, setExtensionResponseReceived] = useState(false)

	useEffect(() => {
		const handleExtensionMessage = (event) => {
			if (event.data.type === 'FROM_EXTENSION') {
				setExtensionInstalled(true)
				setExtensionResponseReceived(true)
				localStorage.setItem('extensionInstalled', 'true')
			}
		}

		window.addEventListener('message', handleExtensionMessage)
		dispatchEvent('isExtensionInstalled')

		const timeoutId = setTimeout(() => {
			if (!extensionResponseReceived) {
				setExtensionInstalled(false)
				localStorage.setItem('extensionInstalled', 'false')
			}
		}, 15000)

		dispatchEvent('userLoggedIn', { token: localStorage.getItem('token') })

		return () => {
			window.removeEventListener('message', handleExtensionMessage)
			clearTimeout(timeoutId)
		}
	}, [extensionResponseReceived, extensionInstalledStorage]) // Dependency list

	if (!extensionInstalled) {
		return (
			<div className={styles.install_extension_container}>
				<div className={styles.content_container}>
					<p className={styles.extension_text}>
						Install the <span style={{ fontWeight: '700', color: '#0B66C2' }}>Dexra</span>{' '}
						extension, <br /> and you are all set!
						
					</p>
					<a href='https://chromewebstore.google.com/detail/ibdhnmogbcjdikcenihpmhkdgjejbcpf' rel='noreferrer' style={{textDecoration: 'none'}} target='_blank'>
					<button className={styles.install_button}>
						<div style={{ display: 'flex', alignItems: 'center', columnGap: '7px' }}>
							<img width={'30px'} src={chromeImage} />
							Install on Chrome <img src={arrow} />
						</div>
					</button>
					</a>
					<p style={{ marginTop: '40px', fontSize: '15px' }}>
						After the installation,{' '}
						<span
							onClick={() => window.location.reload()}
							style={{
								color: '#0B66C2',
								textDecoration: 'underline',
								fontWeight: '500',
								cursor: 'pointer',
							}}>
							refresh
						</span>{' '}
						the page.
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<div className={styles.sidebar}>
				<Sidebar />
			</div>
			<div className={styles.feed_container}>
				<Outlet />
			</div>
		</div>
	)
}

export default Home
