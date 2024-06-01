import React, { useState } from 'react'
import Modal from '../../Modal/Modal' // Assume this is your modal component
import styles from './Gallery.module.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Gallery = ({ images }) => {
	const [showModal, setShowModal] = useState(false)
	const openModal = () => setShowModal(true)

	const renderOneImage = (image) => {
		return (
			<div>
				<div key={0} onClick={openModal} className={styles.imageContainer}>
					<LazyLoadImage
						alt=''
						src={image}
						effect='blur'
						placeholderSrc={require('../../../assets/placeholder.jpg')} // Optional: Placeholder image
						className={styles.image}
					/>
				</div>
			</div>
		)
	}

	const renderMultipleImages = (images) => {
		return images.slice(0, 2).map((image, index) => (
			<div key={index} onClick={openModal} className={styles.imageContainer}>
				<LazyLoadImage
					alt=''
					src={image}
					effect='blur'
					placeholderSrc={require('../../../assets/placeholder.jpg')} // Optional: Placeholder image
					className={styles.image_of_many}
				/>
				{index === 1 && images.length > 2 && (
					<div className={styles.overlay}>+{images.length - 2}</div>
				)}
			</div>
		))
	}

	return (
		<div className={styles.gallery}>
			{images.length === 1 ? (
				renderOneImage(images[0])
			) : (
				<div className={styles.container}>{renderMultipleImages(images)}</div>
			)}
			{showModal && <Modal images={images} closeModal={() => setShowModal(false)} />}
		</div>
	)
}

export default Gallery
