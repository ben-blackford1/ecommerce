import Link from "next/link";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import styles from "./styles.module.scss";

export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <a href="/" className={styles.logo}>
          <img src="../../../logo.png" alt="" />
        </a>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
          <div className={styles.search__icon}>
            <RiSearch2Line />
          </div>
        </div>
        <a href="/cart" className={styles.cart}>
          <FaOpencart />
        </a>
      </div>
    </div>
  );
}
