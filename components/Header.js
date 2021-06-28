import styles from '@styles/Header.module.scss'
import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
const Header = () => {
  const router = useRouter()
  console.log(router)
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link href='/'>
          <a>
            <Image src='/tks-logo4.svg' alt='' height={60} width={120} />
          </a>
        </Link>

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
            <li>
              <Link href='/about'>
                <a>About us</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.btn__grp}>
          <button className={styles.btn}>
            Cart <AiOutlineShopping size='26'></AiOutlineShopping>
          </button>
          <button className={styles.btn}>
            Log in <AiOutlineUser size='26'></AiOutlineUser>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
