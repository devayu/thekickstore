import Header from '@components/Header'
import styles from '../styles/Home.module.scss'
import Head from 'next/head'
const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>The Kick Store</title>
      </Head>
      <Header></Header>
      {children}
    </div>
  )
}

export default Layout
