import Image from 'next/image';
import styles from '@styles/Hero.module.scss';
import Link from 'next/link';
import heroImg from '../public/jordan_banner.jpg';
const Hero = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.container__left}>
          <h1>NEW SEASON, NO LIMITS.</h1>
          <h2>Give your feet the superpower they need.</h2>

          <Link href='/products/all'>
            <button>Shop Now</button>
          </Link>
        </div>
        <div className={styles.container__right}>
          <Image src={heroImg} alt='' layout='responsive' priority />
        </div>
      </div>
    </div>
  );
};

export default Hero;
