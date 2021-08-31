import styles from '@styles/Product.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux';
import { addToCart } from 'store/slices/cartSlice';

export const getServerSideProps = async (context) => {
  const fetchSneakerApi = await fetch(
    `https://api.stripe.com/v1/products/${context.query.id}`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY,
      },
    }
  );
  const fetchSneakerData = await fetchSneakerApi.json();

  return {
    props: {
      sneaker: fetchSneakerData,
    },
  };
};

const ProductPage = ({ sneaker }) => {
  const dispatch = useDispatch();
  const addProduct = (productInfo) => {
    dispatch(addToCart(productInfo));
  };
  const notify = () =>
    toast.success('Product Added', {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__left}>
        <div className={styles.sneaker__img}>
          <img src={sneaker.images[0]} alt='' />
        </div>
        <button
          className={styles.addToCartBtn}
          onClick={() => {
            notify();
            addProduct({
              productId: sneaker?.id,
              productQuantity: 1,
              productImg: sneaker?.images[0],
              productPrice: sneaker?.metadata.price,
              productName: sneaker?.name,
              priceID: sneaker?.metadata.priceID,
            });
          }}
        >
          Add to Cart
        </button>
        <ToastContainer></ToastContainer>
      </div>
      <div className={styles.wrapper__right}>
        <div className={styles.wrapper__right__top}>
          <h5 className={styles.sneaker__brand}>{sneaker.metadata.brand}</h5>
          <h3 className={styles.sneaker__name}>{sneaker.name}</h3>
          <h4 className={styles.sneaker__retPrice}>
            <span>
              &#8377;
              {Math.floor(sneaker.metadata.price).toLocaleString()}.00
            </span>
          </h4>
          <p className={styles.sneaker__story}>{sneaker?.description}</p>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
