import { ReactElement } from 'react';

import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';

import { useAppDispatch } from '../../hooks';
import { deleteCar } from '../../store/middlewares';

import cls from './DeleteForm.module.scss';

interface DeleteFormProps {
    carId: string;
}

export const DeleteForm = ({ carId }: DeleteFormProps): ReactElement => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onBack = () => {
        router.push('/view');
    };

    const onDelete = async () => {
        const { meta } = await dispatch(deleteCar(carId));

        if (meta.requestStatus === 'fulfilled') {
            router.push('/view');
        }
    };

    return (
        <div className={cls.form}>
            <span className={cls.title}>
                Вы действительно хотите удалить этот автомобиль?
            </span>
            <div className={cls.btnGroup}>
                <Button variant="danger" onClick={onDelete}>
                    Удалить
                </Button>
                <Button variant="primary" onClick={onBack}>
                    Вернуться назад
                </Button>
            </div>
        </div>
    );
};
