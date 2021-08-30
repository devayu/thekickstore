import '@styles/globals.scss';
import Layout from '@components/Layout';
import { Provider } from 'react-redux';
import { Provider as AuthProvider } from 'next-auth/client';
import { store } from '../store/store';
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
