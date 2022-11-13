import Head from 'next/head';
import {GetServerSideProps, NextPage} from 'next';
import {Car} from '../src/types';
import {AppLink, Table} from '../src/components';
import cls from 'styles/View.module.scss';

interface ViewProps {
    cars: Car[]
}

const View: NextPage<ViewProps> = ({cars}) => {
    return (
        <div className={cls.wrapper}>
            <Head>
                <title>Автомобили</title>
            </Head>
            <AppLink
                className={cls.btn}
                href={'/update'}
            >
                Добавить автомобиль
            </AppLink>
            <Table cars={cars}/>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ViewProps> = async () => {
    const response = await fetch('http://localhost:3001/cars');
    const data = await response.json();

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {cars: data}
    }
}

export default View;
