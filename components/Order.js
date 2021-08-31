import React from 'react';
import styles from '@styles/Order.module.scss';
import moment from 'moment';
const Order = ({ amount, products, timestamp, id }) => {
  const truncate = (input) =>
    input.length > 5 ? `${input.substring(0, 25)}...` : input;
  return (
    <div className={styles.wrapper}>
      <div className={styles.orderId}>
        <p>ORDER # </p>
        <p> {truncate(id)}</p>
      </div>
      <div className={styles.container}>
        <div>
          <p>ORDER PLACED</p>
          <p>{moment.unix(timestamp).format('DD MMM YYYY')}</p>
        </div>
        <div>
          <p>TOTAL</p>
          <p>&#8377; {Math.floor(amount).toLocaleString()}</p>
        </div>
        <p className={styles.totalItems}>{products.length} items</p>
      </div>
      <div className={styles.products}>
        {products.map((product) => {
          return (
            <div className={styles.products__product}>
              <img src={product.img} alt={product.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
