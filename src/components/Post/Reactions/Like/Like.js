import React, { useState } from 'react'
import styles from './Like.module.css'
import ReactionTypes from '../ReactionTypes/ReactionTypes'
import dispatchEvent from '../../../../utils/dispatchEvent'
import pLike from '../../../../assets/pLike.png'

const Like = ({ urn, image }) => {
	const [isHovering, setIsHovering] = useState(false)
	const [img, setImg] = useState(image)
	const [submitted, setSubmitted] = useState(false)

	const handleMouseEnter = () => {
		setIsHovering(true)
	}

	const handleMouseLeave = () => {
		setIsHovering(false)
	}

	const handleLikeSubmit = (e) => {
		setImg(pLike)
		setSubmitted(true)
		e.preventDefault()
		// dispatchEvent('likeSubmitted', { urn, reactionType: 'LIKE' })
	}

	const handleReactionClick = (image, reactionType) => {
		setImg(image)
		setSubmitted(true)
		// dispatchEvent('likeSubmitted', { urn, reactionType })
	}

	return (
		<div
			className={styles.like}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			{!submitted ? (
				<img
					src={image}
					alt='like'
					className={styles.like_image}
					onClick={handleLikeSubmit}
				/>
			) : (
				<img src={img} alt='like' className={styles.reaction_image} />
			)}
			{!submitted && isHovering && (
				<ReactionTypes onReactionClick={handleReactionClick} />
			)}
		</div>
	)
}

export default Like
