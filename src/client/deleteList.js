import baseUrl from './baseUrl'
import getAuthHeader from './getAuthHeader'

const deleteList = async (listId) => {
	const res = await fetch(`${baseUrl}/list/${listId}`, {
		method: 'DELETE',
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json',
		},
	})

	return res
}

export default deleteList
