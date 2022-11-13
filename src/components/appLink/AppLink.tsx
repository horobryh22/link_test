import {ReactElement, ReactNode} from 'react';

import cls from './AppLink.module.scss';
import Link from 'next/link';

interface AppLinkProps {
    className?: string;
    href: string;
    children: ReactNode;
}

export const AppLink = ({href, children, className}: AppLinkProps): ReactElement => {

    return <Link href={href} className={`${cls.appLink} ${className}`}>{children}</Link>;

};