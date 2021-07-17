import { useState, useEffect } from 'react'

import styles from '@styles/Arrivals.module.scss'
const Arrivals = ({ newArrivals }) => {
  console.log(newArrivals)
  return (
    <div className={styles.container}>
      <h1>New Arrivals</h1>
      <div className={styles.sneakerlist}>
        {newArrivals?.map((sneaker) => {
          return (
            <div key={sneaker.id} className={styles.sneakerlist__sneak}>
              <div className={styles.sneakerlist__sneak__img}>
                <img src={sneaker.image?.thumbnail}></img>
              </div>
              <p className={styles.sneakerlist__sneak__brand}>
                {sneaker.brand}
              </p>
              <h2>
                {sneaker.silhouette}
                <span className={styles.sneakerlist__sneak__price}>
                  ${sneaker.retailPrice}
                </span>
              </h2>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Arrivals
