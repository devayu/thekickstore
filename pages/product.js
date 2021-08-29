import { GlobalContext } from '@context/GlobalState';
import { withRouter } from 'next/router';
import styles from '@styles/Product.module.scss';

import Image from 'next/image';
import { useState, useContext } from 'react';

export const getServerSideProps = async (context) => {
  const fetchSneakerApi = await fetch(
    `https://api.stripe.com/v1/products/${context.query.id}`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + process.env.STRIPE_KEY,
      },
    }
  );
  const fetchSneakerData = await fetchSneakerApi.json();

  return {
    props: {
      sneaker: fetchSneakerData,
    },
  };
};

const ProductPage = ({ sneaker }) => {
  const addProduct = (productInfo) => {
    const cart = localStorage.getItem('cartList');
    const cartList = JSON.parse(cart);
    cartList.push(productInfo);
    // const tempCart = [];
    // if (cartList.length) {
    //   cartList.map((item) => {
    //     if (
    //       item.productId === productInfo.productId &&
    //       item.productColor === productInfo.productColor
    //     )
    //       item.productQuantity += 1;
    //     else tempCart.push(productInfo);
    //   });
    //   cartList.push(...tempCart);
    // } else {
    //   cartList.push(productInfo);
    // }
    localStorage.setItem('cartList', JSON.stringify(cartList));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__left}>
        <div className={styles.sneaker__img}>
          <img src={sneaker.images[0]} alt='' />
        </div>
        <button
          className={styles.addToCartBtn}
          onClick={() => {
            addProduct({
              productId: sneaker?.id,
              productQuantity: 1,
              productImg: sneaker?.images[0],
              productPrice: sneaker?.metadata.price,
              productName: sneaker?.name,
              priceID: sneaker?.metadata.priceID,
            });
          }}
        >
          Add to Cart
        </button>
      </div>
      <div className={styles.wrapper__right}>
        <div className={styles.wrapper__right__top}>
          <h5 className={styles.sneaker__brand}>{sneaker.metadata.brand}</h5>
          <h3 className={styles.sneaker__name}>{sneaker.name}</h3>
          <h4 className={styles.sneaker__retPrice}>
            <span>${sneaker.metadata.price}.00</span>
          </h4>
          <p className={styles.sneaker__story}>{sneaker?.description}</p>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
