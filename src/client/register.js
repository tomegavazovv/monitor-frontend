const { default: baseUrl } = require('./baseUrl')

module.exports = async (email, password, passwordConfirm) => {
	const res = await fetch(`${baseUrl}/users/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
			passwordConfirm,
		}),
	})

	const data = res.json()
	return data
}
