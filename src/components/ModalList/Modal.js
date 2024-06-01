import React from 'react'
import styles from './Modal.module.css' // Assuming modal uses the same CSS

const Modal = ({ isOpen, onClose, children }) => {
	const handleModalClose = (e) => {
		if (e.target === e.currentTarget) {
			onClose()
			e.stopPropagation()
		}
	}

	return isOpen ? (
		<div className={styles.modal} onClick={handleModalClose}>
			<div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	) : null
}

export default Modal
