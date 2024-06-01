import baseUrl from './baseUrl'
import getAuthHeader from './getAuthHeader'

const addList = async (listName) => {
	const res = await fetch(`${baseUrl}/list`, {
		method: 'POST',
		body: JSON.stringify({
			name: listName,
		}),
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json',
		},
	})

	const data = await res.json()
	return data['data']
}

export default addList
