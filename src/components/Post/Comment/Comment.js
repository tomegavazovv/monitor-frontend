import React from 'react'
import styles from './Comment.module.css'
import reactionsImg from '../../../assets/reactions.png'

const Comment = ({ photoSrc, name, headline, date, reactionCount, elements }) => {
	const formattedHeadline =
		headline.length > 100 ? headline.slice(0, 90) + '...' : headline
	return (
		<div className={styles.comment_container}>
			<div className={styles.author_info}>
				<img src={photoSrc} alt='' className={styles.photo} />
				<div className={styles.backgroundWrapper}>
					<div className={styles.info_date}>
						<div className={styles.author_details}>
							<p className={styles.name}>{name}</p>
							<p className={styles.headline}>{formattedHeadline}</p>
						</div>
						<p className={styles.date}>{date}</p>
					</div>
					<div className={styles.content_container}>
						{elements.map((el, index) => (
							<span key={index} className={styles.content}>
								{el.includes('- link') ? (
									<span>
										<br />
										{el.replace(' - link', '')}
									</span>
								) : (
									el
								)}
							</span>
						))}
					</div>
				</div>
			</div>

			{reactionCount !== '' && reactionCount && (
				<div className={styles.reactions_container}>
					<img className={styles.reactions_img} src={reactionsImg} />
					<p>{reactionCount}</p>
				</div>
			)}
		</div>
	)
}

export default Comment
