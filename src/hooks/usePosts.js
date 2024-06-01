import { useEffect, useState } from 'react'
import getPosts from '../client/getPosts'
import { useSearchParams } from 'react-router-dom'
import skipPost from '../client/skipPost'

function usePosts(listId) {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(false)
	const [searchParams] = useSearchParams()

	useEffect(() => {
		async function populatePosts() {
			setLoading(true)
			const fetchedPosts = await getPosts(listId, searchParams)
			setPosts(fetchedPosts)
			setLoading(false)
		}
		if (listId) populatePosts()
	}, [listId, searchParams])

	const _skipPost = async (urn) => {
		await skipPost(urn)
	}

	return { posts, loading, skipPost: _skipPost }
}

export default usePosts
