import React from 'react';
import styles from '@styles/Allproducts.module.scss';
import Link from 'next/link';
const allproducts = ({ sneakers }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {sneakers.map((sneak) => {
          return (
            <Link
              href={{
                pathname: '/product',
                query: {
                  id: sneak.id,
                },
              }}
              key={sneak.id}
            >
              <div key={sneak.id} className={styles.products__sneak}>
                <div className={styles.products__sneak__img}>
                  <img src={sneak.images[0]}></img>
                </div>

                <h2 className={styles.products__sneak__name}>
                  {sneak.name}
                  <div>
                    <h2 className={styles.products__sneak__price}>
                      &#8377;
                      {Math.floor(sneak.metadata.price).toLocaleString()}
                      .00
                    </h2>
                  </div>
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default allproducts;
export const getServerSideProps = async () => {
  const fetchShoesApi = await fetch(
    `https://api.stripe.com/v1/products?limit=100`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY,
      },
    }
  );
  const fetchShoesData = await fetchShoesApi.json();

  const apiRes = await fetch(
    'https://api.jsonbin.io/v3/b/6123d9502aa80036126e94d0',
    {
      method: 'GET',
      headers: {
        'X-Master-Key':
          '$2b$10$y/Nb3KFy/5rQNMhbvh4FGuX144Sqn9RkLEHAJckYwq0pG8krn69Ni',
      },
    }
  );

  return {
    props: {
      sneakers: fetchShoesData?.data,
    },
  };
};
