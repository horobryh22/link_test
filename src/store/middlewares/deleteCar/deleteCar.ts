import {createAsyncThunk} from '@reduxjs/toolkit';
import {instance} from '../../../api';

export const deleteCar = createAsyncThunk<void,
    string,
    { rejectValue: string }>
('app/deleteCar', async (carId, {rejectWithValue}) => {
    try {
        const {data} = await instance.delete(`/${carId}111`);

        if (!data) {
            throw new Error('Произошла ошибка, данные не были удалены');
        }

    } catch (e) {
        return rejectWithValue('Произошла ошибка, попробуйте обновить страницу');
    }
});
