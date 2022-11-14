import { createAsyncThunk } from '@reduxjs/toolkit';

import { instance } from '../../../api';
import { Car } from '../../../types';

export const updateCar = createAsyncThunk<void, Car, { rejectValue: string }>(
    'app/updateCar',
    async (car, { rejectWithValue }) => {
        try {
            const { data } = await instance.put(`/cars/${car.id}`, car);

            if (!data) {
                throw new Error('Произошла ошибка, данные не были обновлены');
            }
        } catch (e) {
            return rejectWithValue('Произошла ошибка, попробуйте обновить страницу');
        }
    },
);
