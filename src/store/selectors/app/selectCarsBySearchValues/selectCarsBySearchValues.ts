import { createSelector } from 'reselect';

import { selectBrand } from '../selectBrand/selectBrand';
import { selectCars } from '../selectCars/selectCars';
import { selectModel } from '../selectModel/selectModel';
import { selectYear } from '../selectYear/selectYear';

export const selectCarsBySearchValues = createSelector(
    selectBrand,
    selectModel,
    selectYear,
    selectCars,
    (brand, model, year, cars) =>
        cars?.filter(
            car =>
                car.technical_characteristics?.brand.toLowerCase() ===
                    brand?.toLowerCase() &&
                car.technical_characteristics?.model.toLowerCase() ===
                    model?.toLowerCase() &&
                car.technical_characteristics?.productionYear === year,
        ),
);
