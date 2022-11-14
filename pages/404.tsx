import { useEffect, useRef } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import cls from '../styles/404.module.scss';

const Error: NextPage = () => {
    const myRef = useRef<null | NodeJS.Timeout>(null);
    const router = useRouter();

    useEffect(() => {
        myRef.current = setTimeout(() => {
            router.push('/');
        }, 2000);

        return () => {
            if (myRef.current) {
                clearTimeout(myRef.current);
            }
        };
    }, [router]);

    return (
        <div className={cls.wrapper}>
            <Head>
                <title>Ошибка</title>
            </Head>
            <h1>Ошибка</h1>
            <h2>Что-то пошло не так</h2>
        </div>
    );
};

export default Error;
