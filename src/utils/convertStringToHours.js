function convertStringToHours(str) {
	let hours = 24
	if (str.includes('s')) hours = 1 / 60
	else if (str.includes('m') && !str.includes('mo')) hours = str.split('m')[0] / 60
	else if (str.includes('h')) hours = str.split('h')[0]
	else if (str.includes('d')) hours = str.split('d')[0] * 24
	return hours
}

export default convertStringToHours
