import type { FormSelectProps } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import cls from './BasicSelect.module.scss';

interface BasicSelectProps extends FormSelectProps {
    label: string;
    data: string[];
}

export const BasicSelect = ({ label, data, ...props }: BasicSelectProps) => {
    const mappedData = data?.map(item => {
        return (
            <option key={item} value={item}>
                {item}
            </option>
        );
    });

    return (
        <div className={cls.wrapper}>
            <span className={cls.label}>{label}</span>
            <Form.Select className={cls.select} {...props}>
                {mappedData}
            </Form.Select>
        </div>
    );
};
