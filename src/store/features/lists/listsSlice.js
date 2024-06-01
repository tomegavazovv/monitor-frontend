// src/features/lists/listsSlice.js
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import getLists from '../../../client/getLists'
import addList from '../../../client/addList'
import deleteList from '../../../client/deleteList'
import updateListName from '../../../client/updateListName'
import dispatchEvent from '../../../utils/dispatchEvent'

export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
	const lists = await getLists()
	dispatchEvent('getCsvUploadingLists')
	return lists
})

export const createList = createAsyncThunk(
	'lists/createList',
	async (name, { getState, rejectWithValue }) => {
		const { lists } = getState().lists
		const existingList = lists.find((list) => list.name === name)
		if (existingList) {
			return rejectWithValue('A list with this name already exists.')
		}

		try {
			const newList = await addList(name)
			return newList
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const removeList = createAsyncThunk('lists/removeList', async (id) => {
	deleteList(id)
	return id
})

export const renameList = createAsyncThunk(
	'lists/renameList',
	async ({ id, name }, { getState, rejectWithValue }) => {
		const { lists } = getState().lists

		const existingList = lists.find((list) => list.name === name)
		if (existingList) {
			return rejectWithValue('A list with this name already exists.')
		}

		updateListName(id, name)
		return { id, name }
	}
)

// Slice
const listsSlice = createSlice({
	name: 'lists',
	initialState: {
		lists: [],
		activeListId: null,
		loading: false,
		error: null,
		shouldReload: false,
	},
	reducers: {
		setActiveListId(state, action) {
			state.activeListId = action.payload
		},
		increaseNumberOfMonitored(state, action) {
			const listId = action.payload
			const index = state.lists.findIndex((list) => list.id === listId)
			if (index !== -1) state.lists[index].numberMonitored += 1
		},
		decreaseNumberOfMonitored(state, action) {
			const { listId } = action.payload

			const index = state.lists.findIndex((list) => list.id === listId)
			if (index !== -1) state.lists[index].numberMonitored -= 1
		},
		csvUploading(state, action) {
			const listsUploading = action.payload

			if (listsUploading) {
				listsUploading.forEach((listId) => {
					const index = state.lists.findIndex((list) => list.id === listId)
					console.log(index)
					if (index !== -1) state.lists[index].csvUploading = true
				})
			}
		},
		shouldReloadLists(state, action) {
			state.shouldReload = true
		},
		stopCsvUploading(state, action) {
			const listId = action.payload
			const index = state.lists.findIndex((list) => list.id === listId)
			console.log(index)
			if (index !== -1) state.lists[index].csvUploading = false
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLists.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchLists.fulfilled, (state, action) => {
				state.lists = action.payload
				state.shouldReload = false
				state.loading = false
			})
			.addCase(fetchLists.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(createList.fulfilled, (state, action) => {
				state.lists.push(action.payload)
				state.error = null
			})
			.addCase(createList.rejected, (state, action) => {
				state.error = action.payload
			})
			.addCase(removeList.fulfilled, (state, action) => {
				state.lists = state.lists.filter((list) => list.id !== action.payload)
			})
			.addCase(renameList.fulfilled, (state, action) => {
				const index = state.lists.findIndex((list) => list.id === action.payload.id)
				if (index !== -1) {
					state.lists[index].name = action.payload.name
				}
			})
	},
})

export const selectLists = createSelector(
	(state) => state.lists,
	(lists) => lists.lists
)

export const shouldReload = createSelector(
	(state) => state.lists,
	(lists) => lists.shouldReload
)

export const {
	setActiveListId,
	increaseNumberOfMonitored,
	decreaseNumberOfMonitored,
	csvUploading,
	shouldReloadLists,
	stopCsvUploading,
} = listsSlice.actions

export default listsSlice.reducer
