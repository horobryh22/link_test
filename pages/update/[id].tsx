import cls from 'styles/Update.module.scss';
import Head from 'next/head';
import {GetServerSideProps} from 'next';
import {instance} from '../../src/api';
import {Car} from '../../src/types';
import {MainForm} from '../../src/components';

export interface UpdateProps {
    car: Car
}

const Update = ({car}:UpdateProps) => {
    return (
        <>
            <Head>
                <title>Редактирование автомобиля</title>
            </Head>
            <div className={cls.wrapper}>
                <MainForm car={car}/>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<UpdateProps> = async (context) => {
    const {query} = context;
    const {data} = await instance.get(`/${query.id}`);

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {car: data}
    }
}

export default Update;