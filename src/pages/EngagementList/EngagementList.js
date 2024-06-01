import React, { useEffect, useState } from 'react'
import styles from './EngagementList.module.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import returnImg from '../../assets/return.svg'
import { useNavigate, useParams } from 'react-router-dom'
import useLists from '../../hooks/useLists'
import { Loader } from '../../components/Loader/Loader'
import userImg from '../../assets/enigma.png'
import getEngagements from '../../client/getEngagements'

const EngagementList = () => {
	const navigate = useNavigate()
	const [engagements, setEngagements] = useState([])
	const [loading, setLoading] = useState(false)
	const { listId } = useParams()
	const { getActiveListName } = useLists()

	const name = getActiveListName()

	useEffect(() => {
		setLoading(true)
		getEngagements(listId).then((data) => {
			setLoading(false)
			setEngagements(data)
		})
	}, [listId])

	const handleReturn = (e) => {
		navigate('/home/lists')
	}

	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<p className={styles.title}>
					<div style={{ fontWeight: '500' }}>
						{getActiveListName()}{' '}
						{name && <span style={{ fontSize: '14px' }}>(Engagement Report)</span>}
					</div>{' '}
				</p>
				{/* <div className={styles.underline}></div> */}
			</div>

			<table className={styles.table}>
				<div className={styles.return_container} onClick={handleReturn}>
					<img src={returnImg} className={styles.return_image} alt='return' />
					{/* <span className={styles.return_text}>Lists</span> */}
				</div>
				<thead>
					<tr className={styles.header + ' ' + styles.th}>
						<th className={styles.th}>User</th>
						<th className={styles.th}>Company</th>
						<th className={`${styles.th} ${styles.smallHeader}`}>Likes</th>
						<th className={`${styles.th} ${styles.smallHeader}`}>Comments</th>
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
					{engagements.length === 0 && (
						<div
							style={{
								textAlign: 'center',
								paddingTop: '40px',
								paddingBottom: '40px',
								backgroundColor: 'white',
								fontSize: '16px',
								borderBottomRightRadius: '10px',
								borderBottomLeftRadius: '10px',
							}}>
							You haven't engaged with anyone from this list yet{' '}
						</div>
					)}
					<table className={styles.table}>
						<tbody className={styles.table_body}>
							{engagements.map((engagement, index) => (
								<tr className={styles.tr} key={index}>
									<td className={styles.td}>
										<div className={styles.profile}>
											<LazyLoadImage
												alt='photo'
												src={engagement.user.profileImage} // Use LazyLoadImage for profile images
												effect='blur'
												placeholderSrc={require('../../assets/placeholder.jpg')} // Optional: Placeholder image
												className={styles.profile_image}
												onError={({ currentTarget }) => {
													currentTarget.onerror = null // prevents looping
													currentTarget.src = userImg
												}}
											/>

											<span className={styles.name}>{engagement.user.name}</span>
										</div>
									</td>
									<td className={styles.headline + ' ' + styles.td}>
										<div style={{ paddingLeft: '1px' }}>
											{engagement.user.company || 'Company'}
										</div>
									</td>
									<td className={styles.td}>
										<span className={styles.number}>{engagement.likeCount}</span>
									</td>
									<td className={styles.td}>
										<span className={styles.number + ' ' + styles.commentCount}>
											{engagement.commentCount}
										</span>
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

export default EngagementList
