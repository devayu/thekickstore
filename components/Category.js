import styles from '@styles/Category.module.scss';
import Link from 'next/link';
import Image from 'next/image';
const Category = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.men}>
          <button>Shop NIKE</button>
          <Image src='/shoe-full.jpg' alt='' layout='fill' priority />
        </div>
        <div className={styles.women}>
          <button>Shop Adidas</button>
          <Image src='/shoe-adidas.jpg' alt='' layout='fill' priority />
        </div>
      </div>
      <div className={styles.brands}>
        <Link href='/brands'>All Brands</Link>
      </div>
    </>
  );
};

export default Category;
