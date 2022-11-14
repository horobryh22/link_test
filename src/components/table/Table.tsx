import { ReactElement, useMemo } from 'react';

import { Table } from 'react-bootstrap';

import { Car } from '../../types';

import { Actions } from './actions/Actions';

interface TableProps {
    cars: Car[];
}

export const TableComponent = ({ cars }: TableProps): ReactElement => {
    const mappedCars = useMemo(() => {
        return cars?.map(car => (
            <tr key={car.id}>
                <td>{car.technical_characteristics?.brand}</td>
                <td>{car.technical_characteristics?.model}</td>
                <td>{car.technical_characteristics?.productionYear}</td>
                <td>{car.technical_characteristics?.mileage}</td>
                <td>
                    <Actions carId={car.id} />
                </td>
            </tr>
        ));
    }, [cars]);

    return (
        <Table style={{ textAlign: 'center' }} striped bordered hover>
            <thead>
                <tr>
                    <th>Марка</th>
                    <th>Модель</th>
                    <th>Год выпуска</th>
                    <th>Пробег</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>{mappedCars}</tbody>
        </Table>
    );
};
