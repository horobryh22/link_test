import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { DeleteForm } from '../../src/components';
import cls from '../../styles/Delete.module.scss';

const Delete: NextPage = () => {
    const {
        query: { id },
    } = useRouter();

    return (
        <>
            <Head>
                <title>Удаление автомобиля</title>
            </Head>
            <div className={cls.wrapper}>
                <DeleteForm carId={String(id)} />
            </div>
        </>
    );
};

export default Delete;
