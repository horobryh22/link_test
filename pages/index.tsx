import cls from 'styles/Home.module.scss';
import Head from 'next/head';
import {AppLink} from '../src/components';

const Home = () => {
    return (
        <>
            <Head>
                <title>Главная</title>
            </Head>
            <div className={cls.wrapper}>
                <AppLink
                    className={cls.btn}
                    href="/view"
                >
                    Загрузить автомобили
                </AppLink>
            </div>
        </>
    );
}

export default Home;
