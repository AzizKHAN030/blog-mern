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

const initialState = {
    posts: {
        items: [],
        isLoading: true,
    },
    tags: {
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
    },
});

export const postsReducer = postsSlice.reducer;
