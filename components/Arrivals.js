import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@styles/Arrivals.module.scss';
const Arrivals = ({ newArrivals }) => {
  return (
    <>
      <div className={styles.container}>
        <h1>New Arrivals</h1>
        <div className={styles.sneakerlist}>
          {newArrivals?.map((sneaker) => {
            return (
              <Link href={`/products/${sneaker.id}`} key={sneaker.id}>
                <div className={styles.sneakerlist__sneak}>
                  <div className={styles.sneakerlist__sneak__img}>
                    <img src={sneaker.image?.thumbnail}></img>
                  </div>

                  <h2>
                    {sneaker.name}
                    <p className={styles.sneakerlist__sneak__price}>
                      ${sneaker.retailPrice}.00
                    </p>
                  </h2>
                </div>
              </Link>
            );
          })}
          <div className={styles.slider}></div>
        </div>
      </div>
    </>
  );
};

export default Arrivals;
