import React, { useState, useRef } from 'react'

// Hook that manages the tooltip
export const useTooltip = () => {
	const [isVisible, setIsVisible] = useState(false)
	const showTooltip = () => setIsVisible(true)
	const hideTooltip = () => setIsVisible(false)
	return { isVisible, showTooltip, hideTooltip }
}

// Tooltip Component
export const Tooltip2 = ({ text, children, isVisible }) => {
	if (!isVisible) return children

	return (
		<div style={{ position: 'relative', display: 'inline-block' }}>
			{children}
			<div
				style={{
					position: 'absolute',
					bottom: '100%',
					left: '50%',
					transform: 'translateX(-50%)',
					backgroundColor: 'rgba(0, 0, 0, 0.8)',
					color: '#fff',
					padding: '4px 8px',
					borderRadius: '4px',
					fontSize: '12px',
					zIndex: 1000,
					whiteSpace: 'nowrap',
				}}>
				{text}
			</div>
		</div>
	)
}
