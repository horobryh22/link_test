import { RootState } from '../../../store';

export const selectBrand = (state: RootState) => state.app.searchValues.brand;
