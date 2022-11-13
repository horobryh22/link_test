import {Car} from '../../../types';

export interface AppStateSchema {
    data?: Car[],
    error?: string,
    isLoading: boolean,
}