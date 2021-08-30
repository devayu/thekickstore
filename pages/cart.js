import React, { useEffect, useState } from 'react';
import styles from '@styles/Cart.module.scss';
import { ImCross } from 'react-icons/im';
import Image from 'next/image';
import getStripe from 'lib/get_stripe';
import axios from 'axios';
import { createCheckoutSession } from 'next-stripe/client';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart, selectTotal } from '../store/slices/cartSlice';
import { removeFromCart } from '../store/slices/cartSlice';
import { useSession } from 'next-auth/client';
const cart = () => {
  const [session] = useSession();
  const stripePromise = loadStripe(process.env.stripe_public_key);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const totalPrice = useSelector(selectTotal);

  const deleteItem = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    console.log(cart);
    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items: cart,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) alert(result.error);
  };
  return (
    <div className={styles.wrapper}>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Looks like your cart is empty</p>
      ) : (
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>Product Details</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item) => {
                return (
                  <tr key={item.productId}>
                    <td>
                      <Image
                        src={item.productImg}
                        width={75}
                        height={75}
                      ></Image>
                      <p>{item?.productName}</p>
                    </td>
                    <td>
                      &#8377;
                      {Math.floor(item.productPrice).toLocaleString()}.00
                    </td>
                    <td>{item?.productQuantity}</td>

                    <td>
                      <ImCross
                        color='red'
                        onClick={() => deleteItem(item.productId)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className={styles.table__bottom}>
            <h3>
              Grand Total:{' '}
              <span>
                &#8377;
                {Math.floor(totalPrice).toLocaleString()}.00
              </span>
            </h3>
            <button
              disabled={!session}
              className={!session ? styles.disabled : styles.checkout_btn}
              onClick={createCheckoutSession}
            >
              {!session ? 'Sign in to Checkout' : 'Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default cart;
