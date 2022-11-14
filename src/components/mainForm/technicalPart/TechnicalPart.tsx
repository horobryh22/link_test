import { ReactElement } from 'react';

import { Button, Form } from 'react-bootstrap';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import { TECHNICAL_ELEMENTS } from '../../../constant/form';
import { FormValues } from '../../../types';

import cls from './TechnicalPart.module.scss';

interface TechnicalPartProps {
    control: Control<FormValues>;
    errors: FieldErrors<FormValues>;
    onAddOption: () => void;
}

export const TechnicalPart = ({
    errors,
    control,
    onAddOption,
}: TechnicalPartProps): ReactElement => {
    const technicalElements = TECHNICAL_ELEMENTS.map(element => (
        <Controller
            key={element.id}
            name={element.name}
            rules={{ required: { value: true, message: 'Данное поле обязательно' } }}
            control={control}
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
            {technicalElements}
            <Button className={cls.btn} variant="primary" onClick={onAddOption}>
                Добавить опцию
            </Button>
        </div>
    );
};
