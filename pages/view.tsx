import { useEffect } from 'react';

import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { instance } from '../src/api';
import { AppLink, Table } from '../src/components';
import { useAppDispatch } from '../src/hooks';
import { appActions } from '../src/store/slices';
import { Car } from '../src/types';
import cls from '../styles/View.module.scss';

interface ViewProps {
    cars: Car[];
}

const View: NextPage<ViewProps> = ({ cars }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(appActions.setData(cars));
    }, [cars, dispatch]);

    return (
        <div className={cls.wrapper}>
            <Head>
                <title>Автомобили</title>
            </Head>
            <div className={cls.btnBlock}>
                <AppLink className={cls.btn} href={'/create'}>
                    Добавить автомобиль
                </AppLink>
                <AppLink className={cls.btn} href={'/search'}>
                    Искать автомобиль
                </AppLink>
            </div>
            <Table cars={cars} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<ViewProps> = async () => {
    const { data } = await instance.get<Car[]>('/cars');

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: { cars: data },
    };
};

export default View;
