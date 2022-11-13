import {ReactElement} from 'react';

import cls from './DeleteForm.module.scss';
import {Button} from 'react-bootstrap';
import {useRouter} from 'next/router';
import axios from 'axios';

interface DeleteFormProps {
    carId: string;
}

export const DeleteForm = ({carId}: DeleteFormProps): ReactElement => {

    const router = useRouter();

    const onBack = () => {
        router.push('/view');
    }

    const onDelete = async() => {
        const result = await axios.delete(`http://localhost:3001/cars/${carId}`);
        router.push('/view');
    }

    return (
        <div className={cls.form}>
            <span
                className={cls.title}>Вы действительно хотите удалить этот автомобиль?</span>
            <div className={cls.btnGroup}>
                <Button
                    variant="danger"
                    onClick={onDelete}
                >
                    Удалить
                </Button>
                <Button
                    variant="primary"
                    onClick={onBack}
                >
                    Вернуться назад
                </Button>
            </div>
        </div>
    );
};