import React, { useState } from 'react'

const Tooltip = ({ text, children }) => {
	const [isVisible, setIsVisible] = useState(false)

	const showTooltip = () => setIsVisible(true)
	const hideTooltip = () => setIsVisible(false)

	return (
		<div style={{ position: 'relative', display: 'inline-block' }}>
			<span onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
				{children}
				{isVisible && (
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
				)}
			</span>
		</div>
	)
}

export default Tooltip
