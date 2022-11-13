import 'styles/globals.scss';
import type { AppProps } from 'next/app';
import SSRProvider from 'react-bootstrap/SSRProvider';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SSRProvider>
            <Component {...pageProps} />
        </SSRProvider>
    );
}
