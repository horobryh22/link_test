import { ReactElement } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import editIcon from '../../../assets/img/edit.svg';
import deleteIcon from '../../../assets/img/remove.svg';

import cls from './Actions.module.scss';

interface ActionsProps {
    carId: string;
}

export const Actions = ({ carId }: ActionsProps): ReactElement => {
    return (
        <div className={cls.actions}>
            <Link href={`update/${carId}`}>
                <Image src={editIcon} alt={'edit'} />
            </Link>
            <Link href={`delete/${carId}`}>
                <Image src={deleteIcon} alt="remove" />
            </Link>
        </div>
    );
};
