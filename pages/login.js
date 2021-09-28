import { useState } from 'react';
import styles from '@styles/Login.module.scss';
import { AiOutlineGoogle } from 'react-icons/ai';
import { auth, googleProvider, emailProvider } from '../firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signIn, signOut, useSession } from 'next-auth/client';
const LoginModal = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (emailInput && passwordInput)
      auth
        .signInWithEmailAndPassword(emailInput, passwordInput)
        .then(() => {
          router.push({
            pathname: '/user',
          });
        })
        .catch(alert);
  };
  const handleGoogleLogin = () => {
    auth
      .signInWithPopup(googleProvider)
      .then(() => {
        router.push({
          pathname: '/user',
        });
      })
      .catch(alert);
  };
  return (
    <div className={styles.wrapper}>
      <h1>Login</h1>
      <p>Get access to your orders, wishlist and more.</p>

      <form className={styles.form} onSubmit={handleEmailLogin}>
        <input
          type='email'
          placeholder='Email'
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          required
        />

        <p>
          Don't have an account?{' '}
          <Link href='/signup'>
            <a className={styles.link}>Sign up now</a>
          </Link>
        </p>

        <div className={styles.btnGrp}>
          <button className={styles.loginBtn} type='submit'>
            Login
          </button>
          <p>or</p>
          <button
            className={styles.loginGoogleBtn}
            onClick={signIn}
            type='button'
          >
            <AiOutlineGoogle size='24' color='#fafafa' />
            <span>Login with Google</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginModal;
