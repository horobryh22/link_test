import { RootState } from '../../../store';

export const selectCarById = (state: RootState, id: string) =>
    state.app.data?.filter(car => car.id === id)[0];
