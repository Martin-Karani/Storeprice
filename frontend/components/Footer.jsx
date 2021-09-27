import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles["footer"]}>
      <div>Assured Prices | 100% Handpicked | ...</div>
      <button className={styles["about-us"] + "flex-row justify-space-btwn"}>
        <p>About StorePrices</p>
        <p>+ More</p>
      </button>
      <div className={styles["none"]}>
        <p>StorePrices</p>
        <p> c 2021</p>
        <p>Privacy Policy T $ C</p>
      </div>
    </footer>
  );
}

export default Footer;
