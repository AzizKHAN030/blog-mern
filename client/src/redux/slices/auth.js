/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pureFinalPropsSelectorFactory } from 'react-redux/es/connect/selectorFactory';
import axios from '../../axios';

export const login = createAsyncThunk('auth/login', async (params) => {
    const { data } = await axios.post('/auth/login', params);

    return data;
});

export const createUser = createAsyncThunk('auth/register', async (params) => {
    const { data } = await axios.post('/auth/register', params);

    return data;
});

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
});

const initialState = {
    data: null,
    isLoading: pureFinalPropsSelectorFactory,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.isLoading = true;
            state.data = null;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        [login.rejected]: (state) => {
            state.isLoading = false;
            state.data = null;
        },
        [fetchUserData.pending]: (state) => {
            state.isLoading = true;
            state.data = null;
        },
        [fetchUserData.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        [fetchUserData.rejected]: (state) => {
            state.isLoading = false;
            state.data = null;
        },
        [createUser.pending]: (state) => {
            state.isLoading = true;
            state.data = null;
        },
        [createUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        [createUser.rejected]: (state) => {
            state.isLoading = false;
            state.data = null;
        },
    },
});
export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
