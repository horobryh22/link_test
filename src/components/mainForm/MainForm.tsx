import {ReactElement, useMemo, useState} from 'react';

import {v4} from 'uuid';
import cls from './MainForm.module.scss';
import {Button, Form} from 'react-bootstrap';
import {Car, FormElement, FormValues} from '../../types';
import {Controller, useForm} from 'react-hook-form';
import {MAIN_ELEMENTS, TECHNICAL_ELEMENTS} from '../../constant/form';
import {useRouter} from 'next/router';
import {instance} from '../../api';

interface MainFormProps {
    car?: Car;
}

export const MainForm = ({car}: MainFormProps): ReactElement => {

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
        await instance.post('', car);
        router.push('/view');
    }

    const mainElements = useMemo(() => {
        return MAIN_ELEMENTS.map((element) => (
            <Controller
                key={element.id}
                name={element.name}
                control={control}
                rules={{required: {value: true, message: 'Данное поле обязательно'}}}
                render={({field}) => {
                    return (
                        <Form.Group className="mb-1">
                            <Form.Label
                                style={{fontSize: '14px'}}
                            >
                                {element.label}
                            </Form.Label>
                            <Form.Control
                                placeholder={element.placeholder}
                                {...field}
                            />
                            <span
                                className={cls.error}
                            >
                                {errors[element.name]?.message}
                            </span>
                        </Form.Group>
                    )
                }}
            />
        ));
    }, [control, errors]);

    const technicalElements = useMemo(() => {
        return TECHNICAL_ELEMENTS.map((element) => (
            <Controller
                key={element.id}
                name={element.name}
                control={control}
                render={({field}) => {
                    return (
                        <Form.Group className="mb-1">
                            <Form.Label
                                style={{fontSize: '14px'}}
                            >
                                {element.label}
                            </Form.Label>
                            <Form.Control
                                placeholder={element.placeholder}
                                {...field}
                            />
                            <span
                                className={cls.error}
                            >
                                {errors[element.name]?.message}
                            </span>
                        </Form.Group>
                    )
                }}
            />
        ));
    }, [control, errors]);

    const optionalElements = useMemo(() => {
        return options.map((element) => (
            <Controller
                key={element.id}
                name={element.id}
                defaultValue={''}
                control={control}
                render={({field}) => {
                    return (
                        <Form.Group className="mb-1">
                            <Form.Label
                                style={{fontSize: '14px'}}
                            >
                                {element.label}
                            </Form.Label>
                            <Form.Control
                                placeholder={element.placeholder}
                                {...field}
                            />
                        </Form.Group>
                    )
                }}
            />
        ));
    }, [control, options]);

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
                <div className={cls.formBlock}>
                    {mainElements}
                    <Button
                        className={cls.btn}
                        variant={extendedFields ? 'danger' : 'primary'}
                        onClick={onExtend}
                    >
                        {extendedFields ? `Убрать технические характеристики` : `Добавить технические характеристики`}
                    </Button>
                </div>
                {
                    extendedFields &&
                    <div className={cls.formBlock}>
                        {technicalElements}
                        <Button
                            className={cls.btn}
                            variant="primary"
                            onClick={onAddOption}
                        >
                            Добавить опцию
                        </Button>
                    </div>
                }
                {
                    optionalElements.length
                        ? <div className={cls.formBlock}>{optionalElements}</div>
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