import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from '../styles/Home.module.scss';
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>The Kicks Store</title>
      </Head>
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default Layout;
