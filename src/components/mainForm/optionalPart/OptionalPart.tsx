import {ReactElement} from 'react';
import cls from './OptionalPart.module.scss';
import {Form} from 'react-bootstrap';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {FormElement, FormValues} from '../../../types';


interface OptionalPartProps {
    control: Control<FormValues>;
    errors: FieldErrors<FormValues>;
    options: Omit<FormElement, 'name'>[];
}

export const OptionalPart = ({errors, control, options}: OptionalPartProps): ReactElement => {

    const optionalElements = options.map((element) => (
        <Controller
            key={element.id}
            name={element.id}
            rules={{required: {value: true, message: 'Данное поле обязательно'}}}
            defaultValue={element.defaultValue || ''}
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
                                {errors[element.id]?.message}
                            </span>
                    </Form.Group>
                )
            }}
        />
    ));

    return <div className={cls.formBlock}>{optionalElements}</div>;
};