import styles from '@styles/Products.module.scss'
import Link from 'next/link'
const Products = ({ sneakers }) => {
  console.log(sneakers)
  const womenSneaks = sneakers
    ?.filter((sneak) => sneak.gender === 'women')
    .slice(0, 6)
  const menSneaks = sneakers
    ?.filter((sneak) => sneak.gender === 'men')
    .slice(0, 6)
  const colorways = (colors) => {
    const splitColors = colors.split('/')
    return splitColors.length
  }
  console.log(womenSneaks)
  return (
    <div className={styles.container} id='all_products'>
      <h2 className={styles.heading}>ALL Products</h2>
      <div className={styles.sections}>
        <section className={styles.womenSection}>
          <h3>WOMEN</h3>
          <div className={styles.grid}>
            {womenSneaks.map((sneak) => {
              return (
                <div key={sneak.id} className={styles.products__sneak}>
                  <div className={styles.products__sneak__img}>
                    <img src={sneak.image?.thumbnail}></img>
                  </div>
                  <p className={styles.products__sneak__brand}>{sneak.brand}</p>
                  <h2 className={styles.products__sneak__name}>
                    {sneak.silhouette}
                  </h2>
                  <p className={styles.products__sneak__price}>
                    ${sneak.retailPrice}
                    <span>{colorways(sneak.colorway)} Colors</span>
                  </p>
                </div>
              )
            })}
          </div>
          <Link href='/women'>
            <div className={styles.shopMore}>Shop Women</div>
          </Link>
        </section>
        <div className={styles.separator}></div>
        <section className={styles.menSection}>
          <h3>MEN</h3>
          <div className={styles.grid}>
            {menSneaks.map((sneak) => {
              return (
                <div key={sneak.id} className={styles.products__sneak}>
                  <div className={styles.products__sneak__img}>
                    <img src={sneak.image?.thumbnail}></img>
                  </div>
                  <p className={styles.products__sneak__brand}>{sneak.brand}</p>
                  <h2 className={styles.products__sneak__name}>
                    {sneak.silhouette}
                  </h2>
                  <p className={styles.products__sneak__price}>
                    ${sneak.retailPrice}
                    <span>{colorways(sneak.colorway)} Colors</span>
                  </p>
                </div>
              )
            })}
          </div>
          <Link href='/men'>
            <div className={styles.shopMore}>Shop Men</div>
          </Link>
        </section>
      </div>
    </div>
  )
}

export default Products
