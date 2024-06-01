const _getImagesUrl = async (url) => {
	const res = await fetch(url)
	const data = await res.json()
	const imageUrl = data.perResolutions.find(
		(resolution) => resolution.width > 600
	).imageManifestUrl

	return imageUrl
}

const getCarouselImages = async (url) => {
	let counter = 0
	let images = []
	while (counter < 3) {
		console.log('s')
		try {
			const imagesUrl = await _getImagesUrl(url)
			console.log(imagesUrl)
			const imagesResponse = await fetch(imagesUrl)
			const data = await imagesResponse.json()
			images = data.pages
			break
		} catch (err) {
			console.log(err)
			counter += 1
		}
	}
	return images
}

module.exports = getCarouselImages
