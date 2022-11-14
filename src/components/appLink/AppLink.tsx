import { ReactElement, ReactNode } from 'react';

import Link from 'next/link';

import cls from './AppLink.module.scss';

interface AppLinkProps {
    className?: string;
    href: string;
    children: ReactNode;
}

export const AppLink = ({ href, children, className }: AppLinkProps): ReactElement => {
    return (
        <Link href={href} className={`${cls.appLink} ${className}`}>
            {children}
        </Link>
    );
};
