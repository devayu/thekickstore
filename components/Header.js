import { useState, useEffect } from 'react';
import styles from '@styles/Header.module.scss';
import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectCart } from '../store/slices/cartSlice';
import { signIn, signOut, useSession } from 'next-auth/client';
const Header = () => {
  const [session] = useSession();
  const router = useRouter();
  const cart = useSelector(selectCart);
  const [cartLength, setCartLength] = useState(0);

  // const [cartLength, setCartLength] = useState('');
  useEffect(() => {
    // const cart = localStorage.getItem('cartList');
    // const cartArray = JSON.parse(cart);
    setCartLength(cart?.length);
  }, [cart]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => router.push('/')}>
          <Image src='/logo1.png' alt='' height={60} width={60} />
        </div>

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
              <Link href='/success'>
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
          {session?.user ? (
            <button className={styles.btn} onClick={() => router.push('/user')}>
              Hi, {session?.user.name}
            </button>
          ) : (
            <button className={styles.btn} onClick={signIn}>
              Log in <AiOutlineUser size='26'></AiOutlineUser>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
