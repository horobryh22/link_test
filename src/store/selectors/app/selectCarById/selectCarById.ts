import { createSelector } from 'reselect';

import { RootState } from '../../../store';

export const selectCarById = createSelector(
    [(state: RootState) => state.app.data, (state: RootState, id: string) => id],
    (cars, id) => cars?.filter(car => car.id === id)[0],
);
