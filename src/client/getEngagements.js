import baseUrl from './baseUrl'
import getAuthHeader from './getAuthHeader'

const getEngagements = async (listId) => {
	const res = await fetch(`${baseUrl}/list/${listId}/engagements`, {
		method: 'GET',
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json',
		},
	})

	const data = await res.json()
	return data['data']
}

export default getEngagements
