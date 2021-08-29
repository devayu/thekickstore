import { useState, useEffect } from 'react';
import styles from '@styles/Header.module.scss';
import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const router = useRouter();

  const [cartLength, setCartLength] = useState('');
  useEffect(() => {
    const cart = localStorage.getItem('cartList');
    const cartArray = JSON.parse(cart);
    setCartLength(cartArray.length);
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Image
          src='/logo1.png'
          alt=''
          height={60}
          width={60}
          onClick={() => router.push('/')}
        />
        {/* <a className={styles.logo}>THE KICKS STORE</a> */}

        <nav className={styles.navbar}>
          <ul>
            <li>
              <Link href='/men'>
                <a>Men</a>
              </Link>
            </li>
            <li>
              <Link href='/women'>
                <a>Women</a>
              </Link>
            </li>
            <li>
              <Link href='/brands'>
                <a>Brands</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.btn__grp}>
          <button
            className={styles.btn}
            onClick={() => {
              router.push('/cart');
            }}
          >
            Cart<AiOutlineShopping size='26'></AiOutlineShopping>
            <div className={styles.label}>
              <p>{cartLength}</p>
            </div>
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              router.push('/login');
            }}
          >
            Log in <AiOutlineUser size='26'></AiOutlineUser>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
