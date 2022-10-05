import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    currentUser: [],
    comments: []
}

const url = './data.json';

export const getComments = createAsyncThunk('comments/getComments', async () => {
    try {
        const res = await axios(url);
        return res;
    } catch (error) {
        console.log(error);
    }
    
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    extraReducers: {
        [getComments.pending]: (state) => {
            state.isLoading = true;
        },
        [getComments.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments = action.payload.data.comments;
            state.currentUser = action.payload.data.currentUser;
        },
        [getComments.rejected]: (state) => {
            state.isLoading = false;
        }
    }
})



export default commentsSlice.reducer;