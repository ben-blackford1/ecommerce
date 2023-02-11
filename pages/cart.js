import Header from "@/components/cart/header";
import styles from "../styles/cart.module.scss";

export default function cart() {
  const cart = [];
  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cart.length > 1 ? (
          <div className={styles.cart__container}></div>
        ) : (
          <div className={styles.empty}>empty</div>
        )}
      </div>
    </>
  );
}
