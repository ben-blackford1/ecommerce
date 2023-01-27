import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDownFill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";

export default function Top() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <div>
          <ul className={styles.top__list}>
            <li className={styles.li}>
              <img
                src="https://cdn.britannica.com/25/4825-004-F1975B92/Flag-United-Kingdom.jpg"
                alt=""
              />
              <span>United Kingdom / GBP</span>
            </li>

            <li className={styles.li}>
              <MdSecurity />
              <span>Buyer Protection</span>
            </li>
            <li className={styles.li}>
              <span>Customer Service</span>
            </li>
            <li className={styles.li}>
              <span>Help</span>
            </li>
            <li className={styles.li}>
              <BsSuitHeart />
              <span>
                <Link href="/profile/wishlist">Wishlist</Link>
              </span>
            </li>
            <li
              className={styles.li}
              onMouseOver={() => setVisible(true)}
              onMouseLeave={() => setVisible(false)}
            >
              {loggedIn ? (
                <li className={styles.li}>
                  <div className={styles.flex}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV-REr89iWROi6ScePs5agSIHpG9BPBDDZ_g&usqp=CAU"
                      alt=""
                    />
                    <span>Ben</span>
                    <RiArrowDownFill />
                  </div>
                </li>
              ) : (
                <li className={styles.li}>
                  <div className={styles.flex}>
                    <RiAccountPinCircleLine />
                    <span>Account</span>
                    <RiArrowDownFill />
                  </div>
                </li>
              )}
              {visible && <UserMenu loggedIn={loggedIn} />}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
