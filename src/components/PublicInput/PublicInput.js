import React, { useState } from 'react'
import styles from './PublicInput.module.css'
import { useParams } from 'react-router-dom'
import dispatchEvent from '../../utils/dispatchEvent'

const PublicInput = ({ dispatchAddingUser, monitoredUsers, disabled }) => {
	const [value, setValue] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const { listId } = useParams()
	const isLinkedInUrl = (url) =>
		/^https:\/\/[a-z]{2,3}\.linkedin\.com\/in\/[a-zA-Z0-9-]+(\/?|\?.*)?$/.test(url)

	const _checkUserExists = (input) => {
		const items = input.split('/')
		const index = items.findIndex((item) => item === 'in')
		const publicId = items[index + 1]
		console.log('publicId')
		console.log(publicId)
		return monitoredUsers.findIndex((user) => user.publicId === publicId) !== -1
	}

	const handleChange = (e) => {
		setValue(e.target.value)
		setErrorMessage('')
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!isLinkedInUrl(value)) {
			setErrorMessage('The provided URL is not a valid LinkedIn Profile URL.')
		} else if (_checkUserExists(value)) {
			setErrorMessage('This user is already added in the list.')
		} else {
			dispatchAddingUser()
			dispatchEvent('inputSubmitted', { url: value, listId: listId })
			setValue('')
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div style={{ position: 'relative' }}>
				<input
					value={value}
					id='input-field'
					className={styles.input_field}
					placeholder={
						disabled
							? 'The number of users in a list is limited to 25 users.'
							: 'LinkedIn public id...'
					}
					onChange={handleChange}
					disabled={disabled}
				/>
				{/* {loading && (
					<div style={{ position: 'absolute', right: '20px', top: '8px', bottom: '0px' }}>
						<Loader width='25px' />
					</div>
				)} */}
			</div>
			{errorMessage !== '' && <p className={styles.error_message}>{errorMessage}</p>}
		</form>
	)
}

export default PublicInput
