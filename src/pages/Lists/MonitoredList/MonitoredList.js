import React, { useEffect, useRef, useState } from 'react'
import useMonitored from '../../../hooks/useMonitored'
import styles from './MonitoredList.module.css'
import deleteImg from '../../../assets/delete.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import PublicInput from '../../../components/PublicInput/PublicInput'
import returnImg from '../../../assets/return.svg'
import { useNavigate, useParams } from 'react-router-dom'
import useLists from '../../../hooks/useLists'
import { Loader } from '../../../components/Loader/Loader'
import userImg from '../../../assets/enigma.png'
import successImg from '../../../assets/check.svg'
import failImg from '../../../assets/fail.svg'
import uploadImg from '../../../assets/upload.svg'
import Tooltip from '../../../components/Tooltip/Tooltip'
import infoImg from '../../../assets/info_black.svg'
import dispatchEvent from '../../../utils/dispatchEvent'
import Papa from 'papaparse'
import Modal from '../../../components/ModalList/Modal'
import StatusCard from '../../../components/StatusCard/StatusCard'
import { useDispatch } from 'react-redux'
import {
	decreaseNumberOfMonitored,
	fetchLists,
	shouldReloadLists,
	stopCsvUploading,
} from '../../../store/features/lists/listsSlice'

const MonitoredList = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { monitoredUsers, deleteFromList, loading, addUserEagerly } = useMonitored()
	const { listId } = useParams()
	const [isCardVisible, setIsCardVisible] = useState(false)
	const [status, setStatus] = useState(null)
	const [hours, setHours] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [numberUploaded, setNumberUploaded] = useState(null)
	const [csvUploadModal, setCsvUploadModal] = useState(false)
	const { getActiveListName } = useLists()
	const [csvUploading, setCsvUploading] = useState(false)
	const [addingUser, setAddingUser] = useState(false)
	const fileInputRef = useRef(null)
	const isLinkedInUrl = (url) =>
		/^https:\/\/[a-z]{2,3}\.linkedin\.com\/in\/[a-zA-Z0-9-]+(\/.*|\?.*)?$/.test(url)

	useEffect(() => {
		const handleExtensionMessage = (event) => {
			if (event.data.type === 'FROM_EXTENSION_IS_CSV_UPLOADING') {
				if (event.data.payload) {
					setCsvUploading(true)
				}
			} else if (event.data.type === 'FROM_EXTENSION_PROFILE_INFO') {
				const { status, content } = event.data.payload
				if (status === 'success') {
					setStatus('succeeded')
					addUserEagerly({ ...content })
				} else if (status === 'failed') {
					setStatus('failed')
				} else {
					const hours = event.data.payload['err'].split('[')[1].split(']')[0]
					setStatus('limit')
					setHours(hours)
				}
				setIsCardVisible(true)
				setAddingUser(false)
				setTimeout(() => {
					setIsCardVisible(false)
					setStatus(null)
				}, 3000)
			}
		}
		window.addEventListener('message', handleExtensionMessage)

		dispatchEvent('isCsvUploading', { listId })
		return () => {
			window.removeEventListener('message', handleExtensionMessage)
		}
	}, [])

	const handleDeleteUser = (userId) => {
		deleteFromList(userId)
		dispatch(decreaseNumberOfMonitored({ listId }))
	}

	const handleReturn = (e) => {
		navigate('/home/lists')
	}

	const stopCsvUpload = () => {
		dispatchEvent('removedCsvList', { listId })
		setCsvUploading(false)
		setCsvUploadModal(false)
		dispatch(stopCsvUploading(listId))
	}

	const handleFileUpload = (e) => {
		if (e.target.files) {
			const file = e.target.files[0]

			Papa.parse(file, {
				header: true,
				skipEmptyLines: true,
				delimiter: ",", // Explicitly specify the delimiter

				complete: function (results) {
					const { data, errors } = results

					if (errors.length > 0) {
						console.error('Parsing Errors:', errors)
						alert(`Error parsing CSV file. Check the format of the uploaded document.`)
						return
					}

					// Find the column with at least one valid LinkedIn URL
					let urlColumn = null

					for (const column of Object.keys(data[0])) {
						if (data.some((row) => isLinkedInUrl(row[column]))) {
							urlColumn = column
							break
						}
					}

					if (!urlColumn) {
						alert('Error: Could not find a column with LinkedIn URLs.')
						return
					}

					// Collect malformed URLs for error reporting
					const malformedUrls = []
					const urls = []
					data.forEach((row, index) => {
						const url = row[urlColumn]
						if (!isLinkedInUrl(url) && url !== '') {
							malformedUrls.push({ row: index + 2, url }) // Offset for 1-based and header row
						} else {
							if(url !== '')
								urls.push(url)
						}
					})

					if (malformedUrls.length > 0) {
						alert(
							`Error: The following rows have invalid LinkedIn URLs: ${malformedUrls
								.map((item) => `Row ${item.row}: ${item.url}`)
								.join('\n')}`
						)
					} else {
						setIsModalOpen(true)
						setCsvUploading(true)
						setNumberUploaded(urls.length)
						dispatchEvent('csvUploaded', {
							urls: urls,
							listId,
							monitoredNumber: monitoredUsers.length,
						})
						dispatch(shouldReloadLists())
					}
				},
				error: function (error) {
					console.error('Error parsing CSV file:', error)
					alert('Error: Unable to parse CSV file.')
				},
			})
		}
	}

	const handleButtonClick = () => {
		if (!csvUploading) fileInputRef.current.click()
	}

	const getCardContent = () => {
		if (status === 'succeeded') {
			return (
				<div>
					<p className={styles.card_content}>
						{}
						<img
							className={styles.success_img}
							src={successImg}
							alt=''
							style={{ width: '25px', marginRight: '10px' }}
						/>
						Successfully added user
					</p>
				</div>
			)
		} else if (status === 'failed') {
			return (
				<div>
					<div
						className={styles.card_content}
						style={{ fontSize: '14px', color: 'red', padding: '10px 5px' }}>
						{}
						<img
							className={styles.success_img}
							src={failImg}
							alt=''
							style={{ width: '25px' }}
						/>
						<div>
							<span>Failed to add user...</span>
							<span style={{ display: 'inline' }}> check the url</span>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div>
					<p
						className={styles.card_content}
						style={{
							fontSize: '14px',
							color: 'red',
							display: 'flex',
							alignItems: 'center',
						}}>
						<img
							className={styles.success_img}
							src={failImg}
							alt=''
							style={{ width: '25px' }}
						/>
						<div>
							<span>
								You passed the limit of 80 added users per day...
								<br />
								Try again in {hours} hours.
							</span>
						</div>
					</p>
				</div>
			)
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.card_container}>
				<StatusCard
					status={'succeeded'}
					isVisible={isCardVisible}
					onTimeout={() => setIsCardVisible(false)}
					duration={3000}>
					{getCardContent()}
				</StatusCard>
			</div>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<div style={{ textAlign: 'center' }}>
					<span>Successfuly uploaded!</span>
					<br />
					<span style={{ fontSize: '15px' }}>
						The processing will take <strong>from a few minutes to a day</strong>,
						depending on the size of your csv.
					</span>
					{numberUploaded > 25 - monitoredUsers.length && (
						<div>
							<br />
							<span style={{ fontSize: '15px' }}>
								The users will be automatically split into{' '}
								{Math.ceil(numberUploaded > 25 - monitoredUsers.length / 25) + 1} lists.
							</span>
						</div>
					)}
				</div>
			</Modal>
			<Modal isOpen={csvUploadModal} onClose={() => setCsvUploadModal(false)}>
				<div style={{ textAlign: 'center' }}>
					<span style={{ fontSize: '15px' }}>
						Are you sure that you want to stop CSV syncing?
					</span>
					<button onClick={stopCsvUpload} className={styles.stopCsvBtn}>
						Stop
					</button>
				</div>
			</Modal>
			<div className={styles.title_container}>
				<span className={styles.title}>
					{getActiveListName()}{' '}
					{monitoredUsers.length > 0 && (
						<span style={{ fontSize: '16px' }}>({monitoredUsers.length})</span>
					)}
				</span>
				{/* <div className={styles.underline}></div> */}
			</div>

			<div className={styles.add_container}>
				<div className={styles.search_container}>
					<p className={styles.public_label}>
						Add a new user by <span className={styles.linkedin_word}>LinkedIn</span>{' '}
						Profile's url.
						<Tooltip text='Paste the URL of a LinkedIn user and add the user to your list - ex: https://www.linkedin.com/in/nikolasokolov/'>
							<span>
								<img className={styles.public_id_info} src={infoImg} alt='' />
							</span>
						</Tooltip>
					</p>
					<div className={styles.public_input}>
						<PublicInput
							disabled={monitoredUsers.length >= 25}
							dispatchAddingUser={() => setAddingUser(true)}
							monitoredUsers={monitoredUsers}
						/>
					</div>
				</div>
				{/* <div className={styles.public_container}>
					<p className={styles.public_label}>
						Add a new user by <span className={styles.linkedin_word}>LinkedIn</span>'s{' '}
						Search{' '}
						<Tooltip text='Search LinkedIn users and add them directly to your list'>
							<span>
								<img className={styles.info} src={infoImg} alt='' />
							</span>
						</Tooltip>
					</p>
					<div
						className={styles.overlay}
						style={{ display: searchClicked ? 'block' : 'none' }}></div>
					<div
						className={styles.search_input}
						ref={resultsRef}
						onClick={() => setShowResults(true)}
						style={{
							position: searchClicked ? 'relative' : 'static',
							zIndex: searchClicked ? '2' : 'auto',
						}}>
						<SearchUser monitoredUsers={monitoredUsers} showResults={showResults} />
					</div>
				</div> */}
				<div
					className={`${styles.add_bulk_container} ${
						csvUploading ? styles.uploading : ''
					} ${monitoredUsers.length >= 25 ? styles.disabledCsv : ''}`}
					id='upload_csv'
					onClick={handleButtonClick}>
					{csvUploading ? (
						<div className={styles.csv_uploading} onClick={() => setCsvUploadModal(true)}>
							<Loader width='25px' backgroundSize='9px 9px' /> Processing CSV...
						</div>
					) : (
						<div className={styles.upload_container}>
							<input
								type='file'
								accept='.csv'
								ref={fileInputRef}
								style={{ display: 'none' }}
								onChange={handleFileUpload}
								disabled={monitoredUsers.length >= 25}
							/>
							<img className={styles.upload_button_image} src={uploadImg} alt='' />{' '}
							<span>Upload CSV</span>
						</div>
					)}
				</div>
			</div>
			<table className={styles.table}>
				<div className={styles.return_container} onClick={handleReturn}>
					<img src={returnImg} className={styles.return_image} />
					{/* <span className={styles.return_text}>Lists</span> */}
				</div>
				<thead>
					<tr className={styles.header + ' ' + styles.th}>
						<th className={styles.th}>User</th>
						<th className={styles.th}>Company</th>
						<th className={styles.th}>Headline</th>
						<th className={styles.th}></th>
					</tr>
				</thead>
			</table>
			{loading ? (
				<div className={styles.loader_container}>
					<Loader />
					<p className={styles.loader_text}>Loading...</p>
				</div>
			) : (
				<div className={styles.scrollableBody}>
					<table className={styles.table}>
						<tbody className={styles.table_body}>
							{addingUser && (
								<tr>
									<div
										className={`${monitoredUsers.length === 0 ? styles.noUsers : styles.hasUsers}`}
										style={{
											display: 'flex',
											justifyContent: 'center',
												borderBottom: '1.5px solid rgb(212, 211, 211)',
											color: 'rgb(44, 44, 44)',
											padding: '10px 0px',
										}}>
										<Loader width='32px' />
									</div>
								</tr>
							)}
							{monitoredUsers.map((mUser, index) => (
								<tr className={styles.tr} key={index}>
									<td className={styles.td}>
										<div className={styles.profile}>
											<LazyLoadImage
												alt='photo'
												src={
													mUser.profileImage.includes('data:image/gif')
														? userImg
														: mUser.profileImage
												} // Use LazyLoadImage for profile images
												effect='blur'
												placeholderSrc={userImg} // Optional: Placeholder image
												className={styles.profile_image}
												onError={({ currentTarget }) => {
													currentTarget.onerror = null // prevents looping
													currentTarget.src = userImg
												}}
											/>

											<a
												style={{ textDecoration: 'none', color: '#333' }}
												href={`https://www.linkedin.com/in/${mUser.publicId}/`}>
												<span className={styles.name}>{mUser.name}</span>
											</a>
										</div>
									</td>

									<td className={styles.td}>
										<div className={styles.company_container}>
											{mUser.company ? mUser.company : 'Company'}
										</div>
									</td>

									<td className={styles.td}>
										<div className={styles.headline}>{mUser.headline}</div>
									</td>
									<td className={styles.actions + ' ' + styles.td}>
										<img
											className={styles.delete_image}
											src={deleteImg}
											alt='Delete'
											onClick={() => handleDeleteUser(mUser.id)}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	)
}

export default MonitoredList
