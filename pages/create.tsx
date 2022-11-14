import cls from 'styles/Create.module.scss';
import Head from 'next/head';
import {MainForm} from '../src/components';
import {createCar} from '../src/store/middlewares';
import {Car} from '../src/types';
import {useAppDispatch} from '../src/hooks';
import {useRouter} from 'next/router';

const Create = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onCreate = async (car: Car) => {
        const {meta} = await dispatch(createCar(car));

        if (meta.requestStatus === 'fulfilled') {
            router.push('/view');
        }
    }

    return (
        <>
            <Head>
                <title>Добавить автомобиль</title>
            </Head>
            <div className={cls.wrapper}>
                <MainForm action={onCreate}/>
            </div>
        </>
    );
}

export default Create;