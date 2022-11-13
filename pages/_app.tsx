import 'styles/globals.scss';
import type { AppProps } from 'next/app';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {Provider} from 'react-redux';
import {store} from '../src/store/store';
import {Error} from '../src/components';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <SSRProvider>
                <Component {...pageProps} />
                <Error/>
            </SSRProvider>
        </Provider>
    );
}
