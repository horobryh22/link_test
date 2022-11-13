import cls from 'styles/Create.module.scss';
import Head from 'next/head';
import {MainForm} from '../src/components';

const Create = () => {
    return (
        <>
            <Head>
                <title>Добавить автомобиль</title>
            </Head>
            <div className={cls.wrapper}>
                <MainForm/>
            </div>
        </>
    );
}

export default Create;