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
        },
        deleteComment: (state, action) => {
            const commentId = action.payload;
            state.comments = state.comments.filter((comment) => comment.id !== commentId);
        },
        addReply: (state, action) => {
            const newState = {...state}
            const index = newState.comments.findIndex(f => f.id === action.payload.cid);
            newState.comments[index].replies.push(action.payload);
            state.comments = [...newState.comments]
        },
        deleteReply: (state, action) => {
            const replyId = action.payload;
            const newState = {...state}
            const index = newState.comments.findIndex(f => f.id === action.payload.cid);
            //state.comments = newState.comments[index].replies.filter
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

export const { addComment, deleteComment, addReply } = commentsSlice.actions;

export default commentsSlice.reducer;