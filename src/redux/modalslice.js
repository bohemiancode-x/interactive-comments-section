import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        active: false,
    },
    reducers: {
        isOpen: (state) => {
            state.active = true
        },
        isNotOpen: (state) => {
            state.active = false
        }
    }
})

export const { isOpen, isNotOpen } = modalSlice.actions

export default modalSlice.reducer