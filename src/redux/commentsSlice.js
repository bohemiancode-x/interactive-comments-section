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
            const newScore = newState.comments[index].score + 1;
            const comment = newState.comments[index];
            //console.log(newScore);
            const updatedComment = {
                ...comment,
                score: newScore,
            };
            state.comments = [
                ...newState.comments.slice(0, index),
                updatedComment,
                ...newState.comments.slice(index + 1)
            ]
        },
        decreaseScore: (state, action) => {
            const newState = {...state}
            const index = newState.comments.findIndex(f => f.id === action.payload);
            const newScore = newState.comments[index].score - 1;
            const comment = newState.comments[index];
            //console.log(newScore);
            const updatedComment = {
                ...comment,
                score: newScore,
            };
            state.comments = [
                ...newState.comments.slice(0, index),
                updatedComment,
                ...newState.comments.slice(index + 1)
            ]
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
                ]
        },
        addReplyScore: (state, action) => {
            const newState = {...state};
            const commentIndex = newState.comments.findIndex(f => f.id === action.payload.cid);
            const replyIndex = newState.comments[commentIndex].replies.findIndex(f => f.id === action.payload.rid);
            const reply = newState.comments[commentIndex].replies[replyIndex];
            const newScore = reply.score + 1;
            const updatedReply = {
                ...reply,
                score: newScore,
            };
            const comment = newState.comments[commentIndex]
            const updatedComment = {
                ...comment,
                replies: [
                    ...comment.replies.slice(0, replyIndex),
                    updatedReply,
                    ...comment.replies.slice(replyIndex + 1)
                ]
            };
            //console.log(updatedComment);
            state.comments = [
                ...newState.comments.slice(0, commentIndex),
                updatedComment,
                ...newState.comments.slice(commentIndex + 1)
            ]
        },
        decReplyScore: (state, action) => {
            const newState = {...state};
            const commentIndex = newState.comments.findIndex(f => f.id === action.payload.cid);
            const replyIndex = newState.comments[commentIndex].replies.findIndex(f => f.id === action.payload.rid);
            const reply = newState.comments[commentIndex].replies[replyIndex];
            const newScore = reply.score - 1;
            const updatedReply = {
                ...reply,
                score: newScore,
            };
            const comment = newState.comments[commentIndex]
            const updatedComment = {
                ...comment,
                replies: [
                    ...comment.replies.slice(0, replyIndex),
                    updatedReply,
                    ...comment.replies.slice(replyIndex + 1)
                ]
            };
            //console.log(updatedComment);
            state.comments = [
                ...newState.comments.slice(0, commentIndex),
                updatedComment,
                ...newState.comments.slice(commentIndex + 1)
            ]
        },
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

export const { addComment, deleteComment, addReply, deleteReply, increaseScore, decreaseScore, addReplyScore, decReplyScore } = commentsSlice.actions;

export default commentsSlice.reducer;