import baseUrl from './baseUrl'
import getAuthHeader from './getAuthHeader'

const getMonitored = async (listId) => {
	const res = await fetch(`${baseUrl}/list/${listId}/monitored`, {
		method: 'GET',
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json',
		},
	})

	const data = await res.json()
	console.log(data)

	return data['data']
}

export default getMonitored
