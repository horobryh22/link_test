import { Car } from '../../../types';

export interface SearchValues {
    model?: string;
    brand?: string;
    year?: string;
}

export interface AppStateSchema {
    data?: Car[];
    error?: string;
    isLoading: boolean;
    searchValues: SearchValues;
}
