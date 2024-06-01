import baseUrl from './baseUrl'
import getAuthHeader from './getAuthHeader'

const getComments = async (urn) => {
	const res = await fetch(`${baseUrl}/posts/${urn}/comments`, {
		method: 'GET',
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json',
		},
	})

	const data = await res.json()
	return data['data']
}

export default getComments
