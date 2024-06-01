import React from 'react'
import styles from './ReactionTypes.module.css'
import pLike from '../../../../assets/pLike.png'
import pFunny from '../../../../assets/pFunny.png'
import pHand from '../../../../assets/pHand.png'
import pLove from '../../../../assets/pLove.png'
import pInsightful from '../../../../assets/pInsightful.png'
import pCelebrate from '../../../../assets/pCelebrate.png'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional for styles

const ReactionTypes = ({ onReactionClick }) => {
	return (
		<div className={styles.hoverOptions}>
			<Tippy content='Like' placement='top'>
				<img
					className={styles.reaction_image}
					src={pLike}
					alt='like'
					onClick={() => onReactionClick(pLike, 'LIKE')}
				/>
			</Tippy>

			<Tippy content='Celebrate' placement='top'>
				<img
					className={styles.reaction_image}
					src={pCelebrate}
					alt='like'
					onClick={() => onReactionClick(pCelebrate, 'PRAISE')}
				/>
			</Tippy>

			<Tippy content='Support' placement='top'>
				<img
					className={styles.reaction_image}
					src={pHand}
					alt='like'
					onClick={() => onReactionClick(pHand, 'APPRECIATION')}
				/>
			</Tippy>

			<Tippy content='Love' placement='top'>
				<img
					className={styles.reaction_image}
					src={pLove}
					alt='like'
					onClick={() => onReactionClick(pLove, 'EMPATHY')}
				/>
			</Tippy>

			<Tippy content='Insightful' placement='top'>
				<img
					className={styles.insightful_image}
					src={pInsightful}
					alt='like'
					onClick={() => onReactionClick(pInsightful, 'INTEREST')}
				/>
			</Tippy>

			<Tippy content='Funny' placement='top'>
				<img
					className={styles.reaction_image}
					src={pFunny}
					alt='like'
					onClick={() => onReactionClick(pFunny, 'ENTERTAINMENT')}
				/>
			</Tippy>
		</div>
	)
}

export default ReactionTypes
