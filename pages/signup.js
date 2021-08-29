import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from '@styles/Signup.module.scss';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import { auth, googleProvider, emailProvider, db } from '../firebase';
import router from 'next/router';
const LoginModal = () => {
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const handleEmailSignup = (e) => {
    e.preventDefault();
    if (emailInput && passwordInput)
      auth
        .createUserWithEmailAndPassword(emailInput, passwordInput)
        .then((resp) => {
          console.log(resp);
          const uid = resp.user?.uid.toString();
          db.collection('users').doc(uid).set({
            name: nameInput,
            id: uid,
          });
        })
        .then(() => {
          auth
            .signInWithEmailAndPassword(emailInput, passwordInput)
            .then(() => {
              router.push('/user');
            });
        })
        .catch(alert);
  };
  const handleGoogleLogin = () => {
    auth.signInWithPopup(googleProvider).catch(alert);
  };
  return (
    <div className={styles.wrapper}>
      <h1>Sign Up</h1>
      <p>To save your cart, wishlist and more.</p>

      <form className={styles.form} onSubmit={handleEmailSignup}>
        <input
          type='text'
          placeholder='Name'
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          required
        />
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
          Already have an account?{' '}
          <Link href='/login'>
            <a className={styles.link}>Login now</a>
          </Link>
        </p>
        <div className={styles.btnGrp}>
          <button className={styles.signUpBtn} type='submit'>
            Sign Up
          </button>
          <p>or</p>
          <button
            className={styles.loginGoogleBtn}
            onClick={handleGoogleLogin}
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
