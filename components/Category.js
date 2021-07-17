import styles from '@styles/Category.module.scss'
import Link from 'next/link'
const Category = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.men}>
          <button>Shop NIKE</button>
          <img src='/shoe-full.jpg' alt='' />
        </div>
        <div className={styles.women}>
          <button>Shop Adidas</button>
          <img src='/shoe-adidas.jpg' alt='' />
        </div>
      </div>
      <div className={styles.brands}>
        <Link href='/brands'>All Brands</Link>
      </div>
    </>
  )
}

export default Category
