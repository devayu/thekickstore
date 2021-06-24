import Hero from '@components/Hero'
import styles from '../styles/Home.module.scss'

export default function Home({ sneakers }) {
  console.log(sneakers)
  return <Hero></Hero>
}

export const getServerSideProps = async () => {
  const apiRes = await fetch(
    'https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=20',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '54106ddf4cmsh2e65e7d42e64017p127dffjsnc2d89c7023f7',
        'x-rapidapi-host': 'v1-sneakers.p.rapidapi.com',
      },
    }
  )
  const apiResult = await apiRes.json()
  return {
    props: {
      sneakers: apiResult?.results,
    },
  }
}
