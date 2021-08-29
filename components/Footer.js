import styles from '@styles/Footer.module.scss'
const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div>
          <h4>Important Links</h4>
          <ul>
            <li>Refunds/Cancellation</li>
            <li>Terms and Conditions</li>
            <li>FAQ</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>My Account</li>
            <li>Track your order</li>
            <li>Contact us</li>
            <li>About us</li>
          </ul>
        </div>
        <div>
          <h4>Follow</h4>
          <ul>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Facebook</li>
          </ul>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&#169; 2021 The Kicks Store</p>
      </div>
    </div>
  )
}

export default Footer
