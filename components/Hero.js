import Image from 'next/image'
import styles from '@styles/Hero.module.scss'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.container__left}>
          <h1>FALL SALE</h1>
          <p>
            Get 20% off on select footwear with promo code <span>FALLSALE</span>
            .
          </p>
          <Link href='/products'>
            <button>Shop Now</button>
          </Link>
        </div>
        <div className={styles.container__right}>
          <img src='/hero-img.jpg'></img>
        </div>
      </div>
    </div>
  )
}

export default Hero
