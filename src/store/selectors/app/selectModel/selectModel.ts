import { RootState } from '../../../store';

export const selectModel = (state: RootState) => state.app.searchValues.model;
