import baseUrl from './baseUrl'
import getAuthHeader from './getAuthHeader'

const skipPost = async (urn) => {
	const res = await fetch(`${baseUrl}/posts/${urn}/skip`, {
		method: 'POST',
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json',
		},
	})

	return res
}

export default skipPost
