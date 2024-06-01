import React, { useEffect, useState } from 'react'
import dispatchEvent from '../../utils/dispatchEvent'
import styles from './SearchUser.module.css'
import searchImg from '../../assets/search.svg'
import placeholderImg from '../../assets/enigma.png'
import { useParams } from 'react-router-dom'
import { Loader } from '../Loader/Loader'

const SearchUser = ({ showResults = true, monitoredUsers }) => {
	const [searchUsers, setSearchUsers] = useState([])
	const [loading, setLoading] = useState(false)
	const { listId } = useParams()
	let timeoutId

	useEffect(() => {
		const handleExtensionMessage = (event) => {
			if (event.data.type === 'FROM_EXTENSION') {
				console.log('Received data from extension:', event.data.payload)
				setLoading(false)
				if (event.data.payload['response']) {
					setSearchUsers(event.data.payload['response'])
				} else setSearchUsers([])
			}
		}

		window.addEventListener('message', handleExtensionMessage)

		return () => {
			window.removeEventListener('message', handleExtensionMessage)
		}
	}, [])

	const handleChange = (e) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => {
			setLoading(true)
			if (e.target.value !== '') dispatchEvent('searchUser', { query: e.target.value })
		}, 500)
	}

	const addUserToList = (e, urn) => {
		if (!e.target.className.includes('disabled')) {
			const urnId = urn.replace('urn:li:fsd_profile:', '')
			dispatchEvent('addByUrn', { urn: urnId, listId })
		} else {
			console.log('disabled')
		}
	}

	return (
		<div className={styles.container}>
			<input
				onChange={handleChange}
				placeholder='Search'
				className={styles.input}></input>
			{showResults && !loading && (
				<div className={styles.results_container}>
					{searchUsers.map((user) => (
						<div className={styles.result}>
							<div className={styles.result_headline}>
								<img src={searchImg} className={styles.search_image} />
								<span className={styles.title}>{user['element']['title']}</span>
								<span className={styles.headline}>{user['element']['headline']}</span>
							</div>
							<div className={styles.add_container}>
								<img
									src={user['element']['profileImage']}
									className={styles.profile_picture}
									alt='profile-pic'
									onError={({ currentTarget }) => {
										currentTarget.onerror = null
										currentTarget.src = placeholderImg
									}}
								/>

								<button
									className={`${styles.add_button} ${
										monitoredUsers.findIndex(
											(u) => u.urn === user.urn.replace('urn:li:fsd_profile:', '')
										) !== -1
											? styles.disabled
											: ''
									}`}
									onClick={(e) => addUserToList(e, user.urn)}>
									Add
								</button>
							</div>
						</div>
					))}
				</div>
			)}
			{loading && (
				<div className={styles.loader_container}>
					<Loader />
				</div>
			)}
		</div>
	)
}

export default SearchUser
