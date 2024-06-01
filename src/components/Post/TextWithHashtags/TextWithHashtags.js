import React, { useState } from 'react'
import styles from './TextWithHashtags.module.css'

function TextWithHashtags({ text }) {
	const [seeMore, setSeeMore] = useState(false)
	const numLines = text.split('\n').length
	const parseText = (inputText) => {
		const regex = /(\#[\w]+)/g
		return inputText.split(regex).map((part, index) => {
			if (part.match(regex)) {
				return (
					<a
						href={`https://twitter.com/hashtag/${part.slice(1)}`}
						key={index}
						className={styles.hashtag}>
						{part}
					</a>
				)
			} else {
				return part
			}
		})
	}

	const getFormattedContent = () => {
		return text.split('\n').map((line, index, array) => (
			<span key={index}>
				{parseText(line)}
				{index !== array.length - 1 && <br />}
			</span>
		))
	}

	return (
		<div className={`${styles.content} ${!seeMore ? styles.truncated : ''}`}>
			{getFormattedContent()}
			{!seeMore && numLines > 1 && (
				<div onClick={() => setSeeMore(true)} className={styles.see_more}>
					...see more
				</div>
			)}
		</div>
	)
}

export default TextWithHashtags
