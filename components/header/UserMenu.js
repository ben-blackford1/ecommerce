import styles from "./styles.module.scss";
import Link from "next/link";

export default function UserMenu({ loggedIn }) {
  return (
    <div className={styles.menu}>
      <h6>Welcome to Ecommerce</h6>
      {loggedIn ? (
        <div className={styles.flex}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV-REr89iWROi6ScePs5agSIHpG9BPBDDZ_g&usqp=CAU"
            alt=""
            className={styles.menu__img}
          />
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h5>Ben</h5>
            <span>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Register</button>
          <button className={styles.btn_outlined}>Login</button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Account</Link>
        </li>
        <li>
          <Link href="/profile/orders">My Orders</Link>
        </li>
        <li>
          <Link href="/profile/messages">Message Center</Link>
        </li>
        <li>
          <Link href="/profile/address">Address</Link>
        </li>
        <li>
          <Link href="/profile/wishlist">Wishlist</Link>
        </li>
      </ul>
    </div>
  );
}
