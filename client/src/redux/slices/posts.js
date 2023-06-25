/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');
    return data;
});

export const fetchTags = createAsyncThunk('/posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

export const fetchComments = createAsyncThunk('/posts/fetchComments', async () => {
    const { data } = await axios.get('/comments');
    return data;
});

export const fetchPostRemove = createAsyncThunk('/posts/fetchPostRemove', async (id) => { await axios.delete(`/posts/${id}`); });

const initialState = {
    posts: {
        items: [],
        isLoading: true,
    },
    tags: {
        items: [],
        isLoading: true,
    },
    comments: {
        items: [],
        isLoading: true,
    },
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducer: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.isLoading = true;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.isLoading = false;
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.isLoading = false;
        },
        [fetchTags.pending]: (state) => {
            state.tags.isLoading = true;
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.isLoading = false;
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.isLoading = false;
        },
        [fetchComments.pending]: (state) => {
            state.comments.isLoading = true;
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.comments.items = action.payload;
            state.comments.isLoading = false;
        },
        [fetchComments.rejected]: (state) => {
            state.comments.items = [];
            state.comments.isLoading = false;
        },
        [fetchPostRemove.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter((post) => post._id !== action.meta.arg);
        },
    },
});

export const postsReducer = postsSlice.reducer;
