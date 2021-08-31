import React from 'react';
import { useSession, signOut, getSession } from 'next-auth/client';
import moment from 'moment';
import { GoSignOut } from 'react-icons/go';
import styles from '@styles/User.module.scss';
import Order from '@components/Order';
import db from '../firebase';
const user = ({ orders }) => {
  const [session] = useSession();

  return (
    <div className={styles.wrapper}>
      {!session ? (
        <div className={styles.warning}>
          <h2>Please, Sign in to see your account.</h2>
        </div>
      ) : (
        <>
          <div className={styles.container__top}>
            <h1>My Account</h1>
            <button onClick={signOut}>
              <GoSignOut size='18'></GoSignOut>
              <span>Sign Out</span>
            </button>
          </div>
          <div className={styles.user_info}>
            <img src={session?.user.image} className={styles.avatar} />
            <h3>{session?.user.name}</h3>
          </div>
          <h2>Your Orders</h2>
          {!orders ? (
            <p>No Orders</p>
          ) : (
            <>
              <p>{orders.length} order(s)</p>
              <div className={styles.orders}>
                {orders.map((order) => (
                  <Order key={order.id} {...order}></Order>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default user;
export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }
  const stripeOrders = await db
    .collection('users')
    .doc(session.user?.email)
    .collection('orders')
    .orderBy('timestamp', 'desc')
    .get();

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => {
      return {
        id: order.id,
        amount: order.data().amount,
        products: order.data().products,
        timestamp: moment(order.data().timestamp.toDate()).unix(),
      };
    })
  );
  // console.log(orders);
  return {
    props: {
      orders: orders,
    },
  };
};
