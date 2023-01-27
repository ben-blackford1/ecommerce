import styles from "./styles.module.scss";
import Ad from "./AdBanner";
import Main from "./Main";
import Top from "./Top";

export default function index() {
  return (
    <header className={styles.header}>
      <Ad />
      <Top />
      <Main />
    </header>
  );
}
