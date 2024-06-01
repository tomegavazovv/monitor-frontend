import React from 'react'
import Post from '../Post/Post'
import Spinner from '../Spinner/Spinner'
import styles from './Posts.module.css'

const Posts = ({ posts, loading }) => (
	<div className={styles.post_container}>
		{!loading ? (
			<div>
				{posts.map((post) => (
					<div key={post.urn} className={styles.post}>
						<Post {...post} />
					</div>
				))}
			</div>
		) : (
			<Spinner />
		)}
	</div>
)

export default Posts
