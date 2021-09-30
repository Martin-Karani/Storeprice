import React from "react";
import NavBar from "./NavBar";
import styles from "../styles/Stores.module.css";

function Stores() {
  return (
    <>
      <NavBar name="STORES" />
      <div className={styles["stores-page"]}>
        <div className={styles["store-category"]}>
          <h3 className="category-name">Electorics Stores</h3>
          <ul className="flex-row">
            {[...Array(5)].map((_, index) => (
              <li className={styles["store-card"]} key={index}>
                <img src="#" alt="" />
                <p>Makuti Store</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles["store-category"]}>
          <h3 className="category-name">Fashion Stores</h3>
          <ul className="flex-row">
            {[...Array(5)].map((_, index) => (
              <li className={styles["store-card"]} key={index}>
                <img src="#" alt="" />
                <p>ShowCase Store</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Stores;
