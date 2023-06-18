/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pureFinalPropsSelectorFactory } from 'react-redux/es/connect/selectorFactory';
import axios from '../../axios';

export const login = createAsyncThunk('auth/login', async (params) => {
    const { data } = await axios.post('/auth/login', params);

    return data;
});

const initialState = {
    data: null,
    isLoading: pureFinalPropsSelectorFactory,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
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
    },
});
export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;
