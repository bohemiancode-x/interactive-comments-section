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
        increaseScore: (state, action) => {
            const newState = {...state}
            const index = newState.comments.findIndex(f => f.id === action.payload);
            newState.comments[index].score = newState.comments[index].score + 1;
            //state.comments = [...newState.comments];
        },
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
            const replyId = action.payload.rid;
            const newState = {...state}
            const index = newState.comments.findIndex(f => f.id === action.payload.cid);
            const comment = newState.comments[index]
            const updatedComment = {
                ...comment,
                replies: comment.replies.filter(reply => reply.id !== replyId)
            };
            state.comments = [
                    ...newState.comments.slice(0, index),
                    updatedComment,
                    ...newState.comments.slice(index + 1)
                ]}
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

export const { addComment, deleteComment, addReply, deleteReply, increaseScore } = commentsSlice.actions;

export default commentsSlice.reducer;