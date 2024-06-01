import baseUrl from './baseUrl'
import getAuthHeader from './getAuthHeader'

const getPosts = async (listId, searchParams) => {
	console.log('listId:', listId)
	const timeFilter = searchParams.get('hours[lt]')
	let query = '?'
	if (timeFilter) query = query + `hours[lt]=${timeFilter}`
	const res = await fetch(`${baseUrl}/list/${listId}/posts${query}`, {
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json',
		},
	})
	const data = await res.json()

	const newPosts = []

	for (const post of data['data']) {
		if (post.date < 1) post.date *= 60
		newPosts.push(post)
	}

	return newPosts
}

export default getPosts
