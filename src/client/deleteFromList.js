import baseUrl from './baseUrl'
import getAuthHeader from './getAuthHeader'

const deleteFromList = async (listId, userId) => {
	const res = await fetch(`${baseUrl}/list/${listId}/${userId}`, {
		method: 'DELETE',
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json',
		},
	})

	return res
}

export default deleteFromList
