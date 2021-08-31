import { useRouter } from 'next/router';
import styles from '@styles/Success.module.scss';
import { GiConfirmed } from 'react-icons/gi';
const success = () => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <GiConfirmed color='green' size='30' />
        <h1>Thank You, Your Order has been confirmed.</h1>
      </div>
      <p>
        Thank you for shopping with us. We'll send a confirmation once your item
        has been shipped, if you would to like to see the status of your
        order(s) please click the button below.
      </p>
      <button className={styles.ordersBtn} onClick={() => router.push('/user')}>
        My orders
      </button>
    </div>
  );
};

export default success;
