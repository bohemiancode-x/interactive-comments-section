import { configureStore } from '@reduxjs/toolkit'
import commentsReducer from './commentsSlice'
import modalReducer from './modalslice'

export default configureStore({
    reducer: {
        comments: commentsReducer,
        modal: modalReducer
    }
});