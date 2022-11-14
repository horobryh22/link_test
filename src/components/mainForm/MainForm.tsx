import { ReactElement, useState } from 'react';

import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import { Car, FormElement, FormValues } from '../../types';

import cls from './MainForm.module.scss';
import { MainPart } from './mainPart/MainPart';
import { OptionalPart } from './optionalPart/OptionalPart';
import { TechnicalPart } from './technicalPart/TechnicalPart';

interface MainFormProps {
    car?: Car;
    isUpdate?: boolean;
    action: (car: Car) => void;
}

export const MainForm = ({
    car,
    isUpdate = false,
    action,
}: MainFormProps): ReactElement => {
    const router = useRouter();

    const {
        id,
        name,
        description,
        contacts,
        price,
        images,
        technical_characteristics,
        options: existOptions,
    } = car || ({} as Car);

    const mappedExistOptions = existOptions?.map(option => {
        const key = Object.keys(option).reduce(key => key);

        return {
            id: key,
            label: 'Новая опция',
            placeholder: 'Введите название опции',
            defaultValue: option[key],
        };
    });
    const isFieldExtended = Boolean(technical_characteristics);
    const [extendedFields, setExtendedFields] = useState(isFieldExtended);
    const [options, setOptions] = useState<Omit<FormElement, 'name'>[]>(
        mappedExistOptions || [],
    );

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
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
        },
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
            id: isUpdate ? id : v4(),
            name,
            images,
            contacts,
            description,
            price,
            technical_characteristics: extendedFields
                ? {
                      mileage,
                      brand,
                      body,
                      productionYear,
                      model,
                      car_id: v4(),
                  }
                : undefined,
            options: Object.entries(restOptions).map(([el1, el2]) => ({ [el1]: el2 })),
        };

        action(car);
    };

    const onExtend = () => {
        setExtendedFields(prev => !prev);
    };

    const onAddOption = () => {
        const option: Omit<FormElement, 'name'> = {
            id: v4(),
            label: 'Новая опция',
            placeholder: 'Введите название опции',
        };

        setOptions([...options, option]);
    };

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
                {extendedFields ? (
                    <TechnicalPart
                        errors={errors}
                        control={control}
                        onAddOption={onAddOption}
                    />
                ) : null}
                {options.length ? (
                    <OptionalPart options={options} control={control} errors={errors} />
                ) : null}
            </div>
            <div className={cls.btnBlock}>
                <Button type="submit" className={cls.btn} variant="primary">
                    {isUpdate ? 'Обновить' : 'Добавить'}
                </Button>
                <Button variant="danger" onClick={onBack}>
                    Вернуться назад
                </Button>
            </div>
        </Form>
    );
};
