import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Car } from '../../../types';
import { createCar, deleteCar, updateCar } from '../../middlewares';
import { AppStateSchema } from '../../types/app/AppStateSchema';

const initialState: AppStateSchema = {
    data: undefined,
    error: undefined,
    isLoading: false,
};

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        clearError: state => {
            state.error = undefined;
        },
        setData: (state, action: PayloadAction<Car[]>) => {
            state.data = action.payload;
        },
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
            .addCase(updateCar.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(updateCar.pending, state => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(createCar.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(createCar.pending, state => {
                state.isLoading = true;
                state.error = undefined;
            }),
});

export const { actions: appActions } = appSlice;
export const { reducer: appReducer } = appSlice;
