import {createAsyncThunk} from '@reduxjs/toolkit';
import {instance} from '../../../api';

export const updateCar = createAsyncThunk<void,
    string,
    { rejectValue: string }>
('app/updateCar', async (carId, {rejectWithValue}) => {
    try {
        const {data} = await instance.delete(`/${carId}`);

        if (!data) {
            throw new Error('Произошла ошибка, данные не были удалены');
        }

    } catch (e) {
        return rejectWithValue('Произошла ошибка, попробуйте обновить страницу');
    }
});
