import baseUrl from './baseUrl'
import getAuthHeader from './getAuthHeader'

const updateListName = async (listId, listName) => {
	console.log(listName)
	const res = await fetch(`${baseUrl}/list/${listId}`, {
		method: 'PUT',
		body: JSON.stringify({
			name: listName,
		}),
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json',
		},
	})

	return res
}

export default updateListName
