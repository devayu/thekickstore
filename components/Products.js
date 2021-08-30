import styles from '@styles/Products.module.scss';
import Link from 'next/link';
const Products = ({ sneakers }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>ALL Products</h2>
      <div className={styles.sections}>
        <section className={styles.sneakers}>
          <div className={styles.grid}>
            {sneakers.slice(0, 8).map((sneak) => {
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
                        {/* <p>{colorways(sneak.colorway)} Colors</p> */}
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

          <Link href='/sneakers'>
            <div className={styles.shopMore}>Shop More</div>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Products;
