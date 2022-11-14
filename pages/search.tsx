import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { instance } from '../src/api';
import { AppLink, BasicSelect, Table } from '../src/components';
import { useTypedSelector } from '../src/hooks';
import { selectCars } from '../src/store/selectors';
import cls from '../styles/Search.module.scss';

interface SearchProps {
    brands: string[];
    models: string[];
    years: string[];
}

const Search: NextPage<SearchProps> = ({ brands, models, years }) => {
    const cars = useTypedSelector(selectCars);

    return (
        <div className={cls.wrapper}>
            <Head>
                <title>Искать автомобиль</title>
            </Head>
            <div className={cls.topBlock}>
                <div className={cls.selectBlock}>
                    <BasicSelect label="Выберите марку" data={brands} />
                    <BasicSelect label="Выберите модель" data={models} />
                    <BasicSelect label="Выберите год выпуска" data={years} />
                </div>
                <AppLink href="/view">К списку автомобилей</AppLink>
            </div>
            <Table cars={cars || []} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<SearchProps> = async () => {
    const { data: brands } = await instance.get('/brands');
    const { data: models } = await instance.get('/models');
    const { data: years } = await instance.get('/productionYears');

    if (!brands || !models || !years) {
        return {
            notFound: true,
        };
    }

    return {
        props: { brands, models, years },
    };
};

export default Search;
