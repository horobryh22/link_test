import { ReactElement } from 'react';

import { Button, Form } from 'react-bootstrap';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import { MAIN_ELEMENTS } from '../../../constant/form';
import { FormValues } from '../../../types';

import cls from './MainPart.module.scss';

interface MainPartProps {
    control: Control<FormValues>;
    errors: FieldErrors<FormValues>;
    onExtend: () => void;
    extendedFields: boolean;
}

export const MainPart = ({
    errors,
    control,
    onExtend,
    extendedFields,
}: MainPartProps): ReactElement => {
    const mainElements = MAIN_ELEMENTS.map(element => (
        <Controller
            key={element.id}
            name={element.name}
            control={control}
            rules={{ required: { value: true, message: 'Данное поле обязательно' } }}
            render={({ field }) => {
                return (
                    <Form.Group className="mb-1">
                        <Form.Label style={{ fontSize: '14px' }}>
                            {element.label}
                        </Form.Label>
                        <Form.Control placeholder={element.placeholder} {...field} />
                        <span className={cls.error}>{errors[element.name]?.message}</span>
                    </Form.Group>
                );
            }}
        />
    ));

    return (
        <div className={cls.formBlock}>
            {mainElements}
            <Button
                className={cls.btn}
                variant={extendedFields ? 'danger' : 'primary'}
                onClick={onExtend}
            >
                {extendedFields
                    ? `Убрать технические характеристики`
                    : `Добавить технические характеристики`}
            </Button>
        </div>
    );
};
