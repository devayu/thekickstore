import '../styles/globals.scss'
import Layout from '@components/Layout'
import { GlobalProvider } from '@context/GlobalState'
function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalProvider>
  )
}

export default MyApp
