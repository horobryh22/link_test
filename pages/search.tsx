import { ChangeEvent } from 'react';

import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { instance } from '../src/api';
import { AppLink, BasicSelect, Table } from '../src/components';
import { useAppDispatch, useTypedSelector } from '../src/hooks';
import {
    selectBrand,
    selectCarsBySearchValues,
    selectModel,
    selectYear,
} from '../src/store/selectors';
import { appActions } from '../src/store/slices';
import cls from '../styles/Search.module.scss';

interface SearchProps {
    brands: string[];
    models: string[];
    years: string[];
}

const Search: NextPage<SearchProps> = ({ brands, models, years }) => {
    const dispatch = useAppDispatch();

    const model = useTypedSelector(selectModel);
    const brand = useTypedSelector(selectBrand);
    const year = useTypedSelector(selectYear);
    const cars = useTypedSelector(selectCarsBySearchValues);

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.id;
        const value = e.target.value;

        switch (id) {
            case 'brand':
                dispatch(appActions.changeSearchValues({ brand: value }));
                break;
            case 'model':
                dispatch(appActions.changeSearchValues({ model: value }));
                break;
            case 'year':
                dispatch(appActions.changeSearchValues({ year: value }));
                break;
            default:
                return null;
        }
    };

    return (
        <div className={cls.wrapper}>
            <Head>
                <title>Искать автомобиль</title>
            </Head>
            <div className={cls.topBlock}>
                <div className={cls.selectBlock}>
                    <BasicSelect
                        id="brand"
                        label="Выберите марку"
                        defaultValue={brand}
                        data={brands}
                        onChange={onChange}
                    />
                    <BasicSelect
                        id="model"
                        label="Выберите модель"
                        defaultValue={model}
                        data={models}
                        onChange={onChange}
                    />
                    <BasicSelect
                        id="year"
                        label="Выберите год выпуска"
                        data={years}
                        defaultValue={year}
                        onChange={onChange}
                    />
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
