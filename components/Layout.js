import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from '../styles/Home.module.scss';
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <meta property='og:title' content='The Kicks Store' />
        <meta
          property='og:image'
          content='https://i.ibb.co/6tNsqpM/Logo-store.png'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://thekickstore.vercel.app/' />
        <title>The Kicks Store</title>
      </Head>
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default Layout;
