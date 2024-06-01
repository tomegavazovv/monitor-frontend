import baseUrl from './baseUrl'
import getAuthHeader from './getAuthHeader'

const _fetchVideo = async (urn) => {
	const res = await fetch(`${baseUrl}/posts/${urn}/video`, {
		headers: {
			Authorization: getAuthHeader(),
			'Content-Type': 'application/json',
		},
	})

	return res
}

const getVideo = async (urn) => {
	let res = ''
	while (true) {
		res = await _fetchVideo(urn)
		if (res.status === 200) break
	}

	const data = await res.json()
	return data.data
}

export default getVideo
