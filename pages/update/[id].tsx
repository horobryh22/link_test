import Head from 'next/head';
import { useRouter } from 'next/router';

import { MainForm } from '../../src/components';
import { useAppDispatch, useTypedSelector } from '../../src/hooks';
import { updateCar } from '../../src/store/middlewares';
import { selectCarById } from '../../src/store/selectors';
import { Car } from '../../src/types';
import cls from '../../styles/Update.module.scss';

const Update = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const car = useTypedSelector(state => selectCarById(state, String(router.query.id)));

    const onUpdate = async (car: Car) => {
        const { meta } = await dispatch(updateCar(car));

        if (meta.requestStatus === 'fulfilled') {
            router.push('/view');
        }
    };

    return (
        <>
            <Head>
                <title>Редактирование автомобиля</title>
            </Head>
            <div className={cls.wrapper}>
                <MainForm car={car} action={onUpdate} isUpdate />
            </div>
        </>
    );
};

export default Update;
