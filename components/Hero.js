import Image from 'next/image'
import styles from '@styles/Hero.module.scss'
const Hero = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.container__left}>
          <h1>Give your feet the love they need</h1>
        </div>
        <div className={styles.container__right}>
          <Image src='/shoe-trans.png' width={500} height={500}></Image>
        </div>
      </div>
    </div>
  )
}

export default Hero
