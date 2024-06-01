import React from 'react'
import styles from './Spinner.module.css'
import { useParams } from 'react-router-dom'

const Spinner = () => {
	const { id } = useParams()
	return <div className={styles.loader}>{id}</div>
}

export default Spinner
