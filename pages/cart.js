import React, { useEffect, useState } from 'react';
import styles from '@styles/Cart.module.scss';
import Image from 'next/image';
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

  return (
    <div>
      <h1>Shopping Cart</h1>
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
            const totalPrice = +item.productQuantity * +item.productPrice;
            total += totalPrice;

            return (
              <tr key={item.productId}>
                <td>
                  <Image src={item.productImg} width={100} height={100}></Image>
                  {item.productName}
                </td>
                <td>${item.productPrice}</td>
                <td>{item.productQuantity}</td>
                <td>${totalPrice}</td>
                <td>
                  <button onClick={() => deleteItem(item.productId)}>
                    del
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>Grand Total: ${total}</p>
    </div>
  );
};

export default cart;
