import { createAsyncThunk } from '@reduxjs/toolkit';

import { instance } from '../../../api';
import { Car } from '../../../types';

export const createCar = createAsyncThunk<void, Car, { rejectValue: string }>(
    'app/createCar',
    async (car, { rejectWithValue }) => {
        try {
            const { data } = await instance.post('/cars', car);

            if (!data) {
                throw new Error('Произошла ошибка, данные не были добавлены');
            }
        } catch (e) {
            return rejectWithValue('Произошла ошибка, попробуйте обновить страницу');
        }
    },
);
