import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getMonitored from '../client/getMonitored'
import deleteFromList from '../client/deleteFromList'

function useMonitored() {
	const { listId } = useParams()
	const [monitoredUsers, setMonitoredUsers] = useState([])
	const [loading, setLoading] = useState(false)

	async function updateMonitoredUsers(listId) {
		setLoading(true)
		const monitoredUsers = await getMonitored(listId)
		setLoading(false)
		setMonitoredUsers(monitoredUsers)
	}

	const _deleteFromList = async (userId) => {
		setLoading(true)

		deleteFromList(listId, userId)
		setMonitoredUsers((prev) => {
			const filtered = prev.filter((mUser) => mUser.id !== userId)
			setLoading(false)
			return filtered
		})
	}

	const addUserEagerly = ({
		image,
		firstName,
		lastName,
		headline,
		urn,
		company,
		id,
		publicId,
	}) => {
		setMonitoredUsers((prev) => {
			const newUser = {
				name: firstName + ' ' + lastName,
				headline,
				profileImage: image,
				id,
				urn: urn,
				company,
				publicId,
			}

			return [newUser, ...prev]
		})
	}

	useEffect(() => {
		updateMonitoredUsers(listId)
	}, [listId])

	return { monitoredUsers, deleteFromList: _deleteFromList, loading, addUserEagerly }
}

export default useMonitored

// return [
// 	...prev,
// 	{ name: firstName + ' ' + lastName, headline, profileImage: p, id: 's' },
// ]
