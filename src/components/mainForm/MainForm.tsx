import {ReactElement, useState} from 'react';

import {v4} from 'uuid';
import cls from './MainForm.module.scss';
import {Button, Form} from 'react-bootstrap';
import {Car, FormElement, FormValues} from '../../types';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router';
import {useAppDispatch} from '../../hooks';
import {createCar} from '../../store/middlewares';
import {MainPart} from './mainPart/MainPart';
import {TechnicalPart} from './technicalPart/TechnicalPart';
import {OptionalPart} from './optionalPart/OptionalPart';

interface MainFormProps {
    car?: Car;
}

export const MainForm = ({car}: MainFormProps): ReactElement => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        name,
        description,
        contacts,
        price,
        images,
        technical_characteristics
    } = car || {} as Car;

    const isFieldExtended = Boolean(technical_characteristics);
    const [extendedFields, setExtendedFields] = useState(isFieldExtended);
    const [options, setOptions] = useState<Omit<FormElement, 'name'>[]>([]);

    const {control, handleSubmit, formState: {errors}} = useForm<FormValues>({
        defaultValues: {
            name: name || '',
            description: description || '',
            contacts: contacts || '',
            price: price || '',
            images: images || '',
            brand: technical_characteristics?.brand || '',
            model: technical_characteristics?.model || '',
            productionYear: technical_characteristics?.productionYear || '',
            body: technical_characteristics?.body || '',
            mileage: technical_characteristics?.mileage || '',
        }
    });

    const onSubmit = async (data: FormValues) => {

        const {
            images,
            brand,
            name,
            contacts,
            price,
            description,
            mileage,
            productionYear,
            model,
            body,
            ...restOptions
        } = data;

        const car: Car = {
            id: v4(),
            name: data.name,
            images: data.images,
            contacts: data.contacts,
            description: data.description,
            price: data.price,
            technical_characteristics: extendedFields ? {
                mileage: data.mileage,
                brand: data.brand,
                body: data.body,
                productionYear: data.productionYear,
                model: data.model,
                car_id: v4()
            } : undefined,
            options: Object.values(restOptions).map(option => ({option_name: option}))
        };

        const {meta} = await dispatch(createCar(car));

        if (meta.requestStatus === 'fulfilled') {
            router.push('/view');
        }
    }

    const onExtend = () => {
        setExtendedFields(prev => !prev);
    };

    const onAddOption = () => {
        const option: Omit<FormElement, 'name'> = {
            id: v4(),
            label: 'Новая опция',
            placeholder: 'Введите название опции'
        }
        setOptions([...options, option])
    }

    const onBack = () => {
        router.push('/view');
    };

    return (
        <Form className={cls.mainForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={cls.formBlockWrapper}>
                <MainPart
                    control={control}
                    errors={errors}
                    extendedFields={extendedFields}
                    onExtend={onExtend}
                />
                {
                    extendedFields
                        ? <TechnicalPart
                            errors={errors}
                            control={control}
                            onAddOption={onAddOption}
                        />
                        : null
                }
                {
                    options.length
                        ? <OptionalPart
                            options={options}
                            control={control}
                            errors={errors}
                        />
                        : null
                }
            </div>
            <div className={cls.btnBlock}>
                <Button
                    type="submit"
                    className={cls.btn}
                    variant="primary"
                >
                    Добавить
                </Button>
                <Button
                    variant="danger"
                    onClick={onBack}
                >
                    Вернуться назад
                </Button>
            </div>
        </Form>
    );
};