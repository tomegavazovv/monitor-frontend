import React, { useEffect, useRef, useState } from 'react'
import styles from './AwareListsButton.module.css'
import dispatchEvent from '../../utils/dispatchEvent'
import expandImg from '../../assets/expand.svg'
import { Loader } from '../Loader/Loader'
import Modal from '../ModalList/Modal'

const AwareListsButton = ({ syncedListsValues, loading, dispatchSubmittedSync }) => {
	const [isFetching, setIsFetching] = useState(false)
	const [failedFetching, setFailedFetching] = useState(false)
	const [awareLists, setAwareLists] = useState([])
	const [dropdownVisible, setDropdownVisible] = useState(false)
	const [selectedIndices, setSelectedIndices] = useState([])
	const dropdownRef = useRef(null)
	useEffect(() => {
		const handleExtensionMessage = (event) => {
			if (event.data.type === 'FROM_EXTENSION_AWARE_LISTS') {
				if (event.data.payload) {
					setAwareLists(event.data.payload)
					setIsFetching(false)
					setDropdownVisible(true)
				} else {
					setIsFetching(false)
					setFailedFetching(true)
				}
			}
		}
		window.addEventListener('message', handleExtensionMessage)

		return () => {
			window.removeEventListener('message', handleExtensionMessage)
		}
	}, [])

	// Close the dropdown when clicking outside
	// useEffect(() => {
	// 	const handleClickOutside = (event) => {
	// 		if (
	// 			dropdownVisible &&
	// 			dropdownRef.current &&
	// 			!dropdownRef.current.contains(event.target)
	// 		) {
	// 			setDropdownVisible(false)
	// 		}
	// 	}
	// 	document.addEventListener('mousedown', handleClickOutside)

	// 	return () => {
	// 		document.removeEventListener('mousedown', handleClickOutside)
	// 	}
	// }, [dropdownVisible])

	const handleGetAwareClick = async () => {
		if (awareLists.length === 0) {
			setIsFetching(true)
			dispatchEvent('getAwareLists')
		} else {
			setDropdownVisible((prev) => !prev)
		}
	}

	const toggleSelection = (e, index) => {
		if (!e.target.className.includes('synced')) {
			setSelectedIndices((prevSelected) => {
				if (prevSelected.includes(index)) {
					return prevSelected.filter((i) => i !== index)
				}
				return [...prevSelected, index]
			})
		}
	}

	const handleSyncClick = () => {
		const selectedLists = selectedIndices.map((index) => awareLists[index])

		if (selectedLists.length > 0) {
			const length = selectedLists.length
			console.log('dispatching')
			setDropdownVisible(false)
			setSelectedIndices([])
			dispatchSubmittedSync(length)
			dispatchEvent('syncAwareLists', { lists: selectedLists })
		}
	}

	return (
		<div className={styles.container}>
			<div
				onClick={handleGetAwareClick}
				className={styles.getAwareButton}
				disabled={isFetching}>
				<Modal isOpen={failedFetching} onClose={() => setFailedFetching(false)}>
					<div className={styles.failed_fetching_container}>
						<div style={{ textAlign: 'center' }}>Failed to fetch Aware lists...</div>
						<div style={{ fontSize: '13px' }}>
							Check if you have installed the Aware extension and are logged in.
						</div>
					</div>
				</Modal>

				<div className={styles.button_content}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							columnGap: '3px',
							fontSize: '11px',
						}}>
						<img
							style={{ width: '20px', height: '20px', margin: '0px' }}
							src='https://app.useaware.co/webpacker/media/images/aware-logo-small-b1140d9f6b9ab946a88de78ec1d99019.png'
						/>
						{isFetching ? 'Fetching' : 'Aware Sync'}
					</div>
					<span>
						<img className={styles.expand_arrow} src={expandImg} />
					</span>
				</div>
			</div>
			{dropdownVisible && (
				<div ref={dropdownRef} className={styles.dropdownContainer}>
					<div>
						<ul className={styles.dropdownList}>
							{loading ? (
								<li
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										paddingTop: '10px',
									}}>
									<Loader width='25px' backgroundSize='9px 9px' />
									<p style={{ fontSize: '14px', marginLeft: '5px' }}>Syncing...</p>
								</li>
							) : (
								<div>
									{awareLists.map((list, index) => (
										<li
											key={index}
											className={`${styles.dropdownItem} ${
												selectedIndices.includes(index) ? styles.activeItem : ''
											} ${
												syncedListsValues.findIndex((value) => value === list.value) !==
												-1
													? styles.synced
													: ''
											}`}
											onClick={(e) => toggleSelection(e, index)}>
											{syncedListsValues.findIndex((value) => value === list.value) !== -1
												? `${list.label} - Synced`
												: list.label}
										</li>
									))}
								</div>
							)}
						</ul>
						{!loading && (
							<button
								className={`${styles.syncButton} ${
									selectedIndices.length > 0 ? '' : styles.select_lists_button
								}`}
								onClick={handleSyncClick}>
								{selectedIndices.length > 0 ? 'Sync' : 'Select lists'}
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default AwareListsButton
