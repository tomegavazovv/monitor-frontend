const dispatchEvent = (eventType, detailData) => {
	console.log(eventType, detailData)
	const event = new CustomEvent(eventType, { detail: detailData })
	window.dispatchEvent(event)
}

export default dispatchEvent
