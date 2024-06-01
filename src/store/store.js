import { configureStore } from '@reduxjs/toolkit'

import listsReducer from './features/lists/listsSlice'

const store = configureStore({
	reducer: {
		lists: listsReducer,
	},
})

export default store
