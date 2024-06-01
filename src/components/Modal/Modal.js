import React, { useState } from 'react'
import styles from './Modal.module.css'

const Modal = ({ images, closeModal }) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const totalImages = images.length

	const handlePrev = () => {
		setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : totalImages - 1))
	}

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages)
	}

	const handleOverlayClick = (event) => {
		if (event.target === event.currentTarget) {
			closeModal()
		}
	}

	return (
		<div className={styles.modal} onClick={handleOverlayClick}>
			<div className={styles.content} onClick={(e) => e.stopPropagation()}>
				<button
					onClick={handlePrev}
					className={`${styles.arrowButton}`}
					style={{ left: 10 }}>
					&#10094; {/* Left arrow */}
				</button>
				<button
					onClick={handleNext}
					className={`${styles.arrowButton}`}
					style={{ right: 10 }}>
					&#10095; {/* Right arrow */}
				</button>
				<img
					src={images[currentIndex]}
					alt={`Image ${currentIndex + 1}`}
					className={styles.image}
				/>
			</div>
		</div>
	)
}

export default Modal
