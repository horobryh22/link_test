import { RootState } from '../../../store';

export const selectYear = (state: RootState) => state.app.searchValues.year;
