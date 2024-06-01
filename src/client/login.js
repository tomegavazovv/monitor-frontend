const { default: baseUrl } = require('./baseUrl')

module.exports = async (email, password) => {
	const res = await fetch(`${baseUrl}/users/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	})

	const data = res.json()
	return data
}
