import Arrivals from '@components/Arrivals'
import Category from '@components/Category'
import Products from '@components/Products'
import Hero from '@components/Hero'
import styles from '../styles/Home.module.scss'
export default function Home({ newArrivals, sneakers }) {
  return (
    <>
      <Hero></Hero>
      <Arrivals newArrivals={newArrivals}></Arrivals>
      <Category></Category>
      <Products sneakers={sneakers}></Products>
    </>
  )
}
export const getStaticProps = async () => {
  const apiRes = await fetch(
    'https://the-sneaker-database.p.rapidapi.com/sneakers?limit=100',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '54106ddf4cmsh2e65e7d42e64017p127dffjsnc2d89c7023f7',
        'x-rapidapi-host': 'the-sneaker-database.p.rapidapi.com',
      },
    }
  )
  const apiResult = await apiRes.json()
  const newArrivals = apiResult?.results
    .filter((sneak) => sneak.image.small && sneak.retailPrice)
    .slice(0, 4)
  const sneakers = apiResult?.results.filter(
    (sneak) => sneak.image.small && sneak.retailPrice
  )

  return {
    props: {
      newArrivals,
      sneakers,
    },
  }
}
