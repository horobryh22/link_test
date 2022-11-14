import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { Provider } from 'react-redux';

import { Error } from '../src/components';
import { store } from '../src/store/store';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider store={store}>
            <SSRProvider>
                <Component {...pageProps} />
                <Error />
            </SSRProvider>
        </Provider>
    );
};

export default App;
