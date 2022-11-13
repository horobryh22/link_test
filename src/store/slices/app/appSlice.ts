import {createSlice} from '@reduxjs/toolkit';

import {AppStateSchema} from '../../types/app/AppStateSchema';
import {deleteCar} from '../../middlewares';

const initialState: AppStateSchema = {
    data: undefined,
    error: undefined,
    isLoading: false,
};

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = undefined;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(deleteCar.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(deleteCar.pending, state => {
                state.isLoading = true;
                state.error = undefined;
            })
});

export const {actions: appActions} = appSlice;
export const {reducer: appReducer} = appSlice;