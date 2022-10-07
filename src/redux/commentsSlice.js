import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    currentUser: [],
    comments: []
}

const url = './data.json';

export const getComments = createAsyncThunk('comments/getComments', async () => {
    try {
        const res = await fetch(url);
        const data = await res.json()
        return data;
    } catch (error) {
        console.log(error);
    }
    
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action) => {
            state.comments = [...state.comments, action.payload]
        }
    },
    extraReducers: {
        [getComments.pending]: (state) => {
            state.isLoading = true;
        },
        [getComments.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments = action.payload.comments;
            state.currentUser = action.payload.currentUser;
        },
        [getComments.rejected]: (state) => {
            state.isLoading = false;
        }
    }
})

export const { addComment } = commentsSlice.actions;

export default commentsSlice.reducer;