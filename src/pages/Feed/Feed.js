import React from 'react'
import usePosts from '../../hooks/usePosts'
import Posts from '../../components/Posts/Posts'
import styles from './Feed.module.css'
import { useParams } from 'react-router-dom'
import FiltersSidebar from './FiltersSidebar/FiltersSidebar'

function Feed() {
	const { listId } = useParams()
	const { posts, loading } = usePosts(listId)
	return (
		<div className={styles.container}>
			<div className={styles.feed_container}>
				{!listId && (
					<p className={styles.pick_list}>
						Pick a list from the sidebar <span className={styles.emoji}>👉</span>{' '}
					</p>
				)}

				<Posts posts={posts} loading={loading} />
			</div>
			<div className={styles.filters_sidebar}>
				<FiltersSidebar loading={loading} />
			</div>
		</div>
	)
}

export default Feed
