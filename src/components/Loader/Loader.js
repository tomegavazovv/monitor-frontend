import React from 'react'
import styles from './Loader.module.css'

export const Loader = ({ width = '40px', backgroundSize = '12px 12px' }) => {
	return (
		<div
			style={{ width: `${width}`, backgroundSize: `${backgroundSize}` }}
			className={styles.loader}></div>
	)
}
