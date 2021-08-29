import React from 'react'
import styles from '@styles/Footertop.module.scss'
import { FaShippingFast } from 'react-icons/fa'
import { RiSecurePaymentFill } from 'react-icons/ri'
import { MdLocalOffer } from 'react-icons/md'
const FooterTop = () => {
  return (
    <>
      <div className={styles.container}>
        <div>
          <FaShippingFast size='24' color='#060606'></FaShippingFast>
          <h4>Fast Shipping</h4>
          <p>Worldwide Deliveries</p>
        </div>
        <div>
          <RiSecurePaymentFill size='24' color='#060606'></RiSecurePaymentFill>
          <h4>Secure payment</h4>
          <p>UPI / Debit Card / Credit Card / Netbanking</p>
        </div>
        <div>
          <MdLocalOffer size='24' color='#060606'></MdLocalOffer>
          <h4>15% Discount</h4>
          <p>On subscribing the newsletter</p>
        </div>
      </div>
      <div className={styles.newsletter}>
        <p>Sign up to our newsletter and get 15% off</p>
        <div className={styles.newsletter__email}>
          <input type='text' placeholder='YOUR EMAIL' />
          <button>Subscribe</button>
        </div>
      </div>
    </>
  )
}

export default FooterTop
