import styles from "./styles.module.scss";

import Main from "./Main";
import Top from "./Top";

export default function index({ country }) {
  return (
    <header className={styles.header}>
      <Top country={country} />
      <Main />
    </header>
  );
}
