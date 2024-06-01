import React, { useEffect, useState } from 'react'
import styles from './FiltersSidebar.module.css'
import useLists from '../../../hooks/useLists'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Styled from './ListSelector'

const FiltersSidebar = ({ loading }) => {
	const navigate = useNavigate()
	const { lists } = useLists()
	const { listId } = useParams()
	const [searchParams, setSearchParams] = useSearchParams()
	const hours = searchParams.get('hours[lt]') ? searchParams.get('hours[lt]') : 24
	const [value, setValue] = useState(hours)
	const location = useLocation()

	const activeIndex = lists.findIndex((list) => list.id === listId)

	const handleListChange = (option) => {
		if (option.length > 0) {
			// Preserve the query parameters
			const queryParams = location.search
			const newPath = `/feed/${option[0].value}${queryParams}`
			navigate(newPath)
		}
	}

	const updateLabel = (value) => {
		if (value < 24) {
			console.log(value)
			return `${value} hour${value > 1 ? 's' : ''}`
		} else {
			const days = Math.floor(value / 24)
			return `${days} day${days > 1 ? 's' : ''}`
		}
	}

	const getOptions = () => {
		return lists.map((list) => ({ label: list.name, value: list.id }))
	}

	const getHours = (val) => {
		let hours = val
		const days = Math.floor(hours / 24)
		if (days === 1) hours = 24
		if (days === 2) hours = 48
		if (days === 3) hours = 72
		return hours
	}

	const handleRangeChange = () => {
		if (!loading) setSearchParams({ 'hours[lt]': value })
	}

	const handleChange = (e) => {
		if (e.target.value && !loading) {
			const newValue = getHours(e.target.value)
			setValue(newValue) // Update the state immediately for UI purposes
		}
	}

	return (
		<div className={styles.container}>
			<p className={styles.list_title}>List:</p>
			<div className={styles.lists_container}>
				{lists.length > 0 && (
					<Styled
						activeIndex={activeIndex}
						options={getOptions()}
						onChange={handleListChange}
					/>
				)}
				<div className={styles.range_selector}>
					<label className={styles.label} htmlFor='timeRange'>
						Posted Before:{' '}
						<span className={styles.time_range_value}>{updateLabel(value)}</span>
					</label>
					<input
						type='range'
						className={`${styles.input} ${!loading ? '' : styles.disabled}`}
						id='timeRange'
						min='3'
						step={3}
						max='72' // 24 for hours (8 steps of 3 hours each) + 30 for 3 days (10 steps per day)
						value={value}
						onChange={handleChange}
						onMouseUp={handleRangeChange}
					/>
				</div>
			</div>
		</div>
	)
}

export default FiltersSidebar
