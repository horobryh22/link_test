import Head from 'next/head';
import {GetServerSideProps, NextPage} from 'next';
import {Car} from '../src/types';
import {AppLink, Table} from '../src/components';
import cls from 'styles/View.module.scss';
import {instance} from '../src/api';

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
                href={'/create'}
            >
                Добавить автомобиль
            </AppLink>
            <Table cars={cars}/>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ViewProps> = async () => {
    const {data} = await instance.get('');

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
