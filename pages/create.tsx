import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { MainForm } from '../src/components';
import { useAppDispatch } from '../src/hooks';
import { createCar } from '../src/store/middlewares';
import { Car } from '../src/types';
import cls from '../styles/Create.module.scss';

const Create: NextPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onCreate = async (car: Car) => {
        const { meta } = await dispatch(createCar(car));

        if (meta.requestStatus === 'fulfilled') {
            router.push('/view');
        }
    };

    return (
        <>
            <Head>
                <title>Добавить автомобиль</title>
            </Head>
            <div className={cls.wrapper}>
                <MainForm action={onCreate} />
            </div>
        </>
    );
};

export default Create;
