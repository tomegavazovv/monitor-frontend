// StatusCard.js

import React, { useState, useEffect } from 'react'
import styles from './StatusCard.module.css'

const StatusCard = ({ status, isVisible, onTimeout, duration = 3000, children }) => {
	const [visible, setVisible] = useState(isVisible)

	// Map status to CSS classes
	const statusClasses = {
		succeeded: styles.succeeded,
		failed: styles.failed,
		unknown: styles.unknown,
	}

	// Determine class name based on the status provided
	const statusClass = statusClasses[status] || statusClasses.unknown

	// Sync internal state with external visibility prop and handle timeout
	useEffect(() => {
		setVisible(isVisible)

		if (isVisible) {
			const timer = setTimeout(() => {
				setVisible(false)
				onTimeout() // Callback to update parent state
			}, duration)

			// Clear the timer when component unmounts or visibility changes
			return () => clearTimeout(timer)
		}
	}, [isVisible, duration, onTimeout])

	// Render only if visible
	if (!visible) return null

	return <div className={`${styles.card} ${statusClass}`}>{children}</div>
}

export default StatusCard
