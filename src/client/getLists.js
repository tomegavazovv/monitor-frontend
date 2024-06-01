import baseUrl from './baseUrl'
import getAuthHeader from './getAuthHeader'

const getLists = async () => {
	const res = await fetch(`${baseUrl}/list`, {
		method: 'GET',
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json',
		},
	})

	const data = await res.json()
	return data['data']['lists']
}

export default getLists
