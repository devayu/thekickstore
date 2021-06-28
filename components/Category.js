import styles from '@styles/Category.module.scss'

const Category = () => {
  return (
    <div className={styles.container}>
      <div className={styles.men}>
        <button>Shop Men</button>
        <img src='/cate-men2.jpg' alt='' />
      </div>
      <div className={styles.women}>
        <button>Shop Women</button>
        <img src='/cate-women2.jpg' alt='' />
      </div>
    </div>
  )
}

export default Category
