import { useEffect, useState } from 'react'
import getLists from '../client/getLists'
import { useParams } from 'react-router-dom'
import addList from '../client/addList'
import deleteList from '../client/deleteList'
import updateListName from '../client/updateListName'

function useLists() {
	const [lists, setLists] = useState([])
	const [activeIndex, setActiveIndex] = useState(null)
	const { listId } = useParams()
	const [loading, setLoading] = useState(false)

	async function _getLists() {
		const fetchedLists = await getLists()
		setLists(fetchedLists)
		setActiveIndex(fetchedLists.findIndex((list) => list.id === listId))
	}

	useEffect(() => {
		setLoading(true)
		_getLists()
			.then(() => {
				setLoading(false)
			})
			.catch((err) => setLoading(false))
	}, [])

	const addNewList = async (name) => {
		const res = await addList(name)
		const data = await res.json()
		await _getLists()
		return data
	}

	const _deleteList = async (listId) => {
		const res = await deleteList(listId)
		await _getLists()
	}

	const getActiveListName = () => {
		if (activeIndex !== null) return lists[activeIndex].name
	}

	const updateName = async (id, name) => {
		await updateListName(id, name)
		await _getLists()
	}

	return {
		lists,
		activeIndex,
		addNewList,
		getActiveListName,
		updateName,
		deleteList: _deleteList,
		refreshLists: _getLists,
		loading,
	}
}

export default useLists
