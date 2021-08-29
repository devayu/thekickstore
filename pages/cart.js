import React, { useEffect, useState } from 'react';
import styles from '@styles/Cart.module.scss';
import { ImCross } from 'react-icons/im';
import Image from 'next/image';
import getStripe from 'lib/get_stripe';
import axios from 'axios';
import { createCheckoutSession } from 'next-stripe/client';
import { loadStripe } from 'stripe';
const cart = () => {
  const [cartList, setCartList] = useState([]);
  let total = 0;
  useEffect(() => {
    const cart = localStorage.getItem('cartList');
    const cartArray = JSON.parse(cart);
    setCartList(cartArray);
  }, []);
  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList));
  }, [cartList]);
  const deleteItem = (id) => {
    setCartList(cartList.filter((item) => item.productId !== id));
  };
  const redirectToCheckout = async () => {
    const {
      data: { id },
    } = await axios.post('/api/checkout_sessions', {
      items: cartList.map((item) => ({
        price: item.priceID,
        quantity: item.productQuantity,
      })),
    });
    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };
  const createPayment = async () => {
    const session = await createCheckoutSession({
      success_url: window.location.origin + '/success',
      cancel_url: window.location.origin + '/cart',
      line_items: cartList.map((item) => ({
        price: item.priceID,
        quantity: item.productQuantity,
      })),

      payment_method_types: ['card'],
      mode: 'payment',
    });
    const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY);
    if (stripe) {
      stripe.redirectToCheckout({ sessionId: session.id });
    }
  };
  return (
    <div className={styles.wrapper}>
      <h1>Shopping Cart</h1>
      {cartList.length === 0 ? (
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
              {cartList?.map((item) => {
                const totalPrice = +item?.productQuantity * +item?.productPrice;
                total += totalPrice;

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
                    <td>${item?.productPrice}</td>
                    <td>{item?.productQuantity}</td>
                    <td>${totalPrice}</td>
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
              Grand Total: <span>${total}</span>
            </h3>
            <button className={styles.checkout_btn} onClick={createPayment}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default cart;
