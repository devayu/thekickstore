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
  const apiResult = await apiRes.json();

  // const sneaker = apiResult.record.filter((sneak) => {
  //   return sneak.id === context.query.id;
  // });

  return {
    props: {
      sneaker: fetchSneakerData,
    },
  };
};

const ProductPage = ({ sneaker }) => {
  const [currColor, setCurrColor] = useState('');
  const [isColor, setIsColor] = useState(false);
  const colorWays = sneaker.colorway?.split('/');

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
            if (!currColor) setIsColor(true);
            if (currColor && isColor) setIsColor(false);
            if (currColor)
              addProduct({
                productImg: sneaker?.image.thumbnail,
                productName: sneaker?.name,
                productBrand: sneaker?.brand,
                productPrice: sneaker?.retailPrice,
                productColor: currColor,
                productId: sneaker?.sku,
                productQuantity: 1,
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
          {/* {sneaker?.colorway && (
            <div className={styles.sneaker__colorWays}>
              <h4>Colors</h4>
              <div>
                {colorWays.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrColor(color);
                    }}
                    className={`${
                      currColor === color ? styles.defaultColor : ''
                    }`}
                  >
                    {color}
                  </button>
                ))}
                {isColor && <span>Please Select a Color</span>}
              </div>
            </div>
          )} */}
          <p className={styles.sneaker__story}>{sneaker?.description}</p>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
