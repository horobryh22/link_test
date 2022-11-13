import cls from 'styles/Delete.module.scss';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {DeleteForm} from '../../src/components';

const Delete = () => {
    const {query: {id}} = useRouter();

    return (
        <>
            <Head>
                <title>Удаление автомобиля</title>
            </Head>
            <div className={cls.wrapper}>
                <DeleteForm carId={String(id)}/>
            </div>
        </>
    );
}

export default Delete;