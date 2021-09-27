import React from "react";
import Image from "next/image";

import { ReactComponent as Favorite } from "../public/heart.svg";
import NavBar from "./NavBar";
import Samsung from "../public/samsung.jpeg";
import styles from "./Deal.module.css";

function Deals() {
  return (
    <>
      <NavBar name="DEALS" />
      <div className={styles["deals"]}>
        <div className={styles["deal-item"]}>
          <Image src={Samsung} alt="" />
          <div className={styles["deal-details"]}>
            <p className={styles["deal-brand"]}>SAMSUNG</p>
            <p className={styles["deal-name"]}>Samsung S9 Plus</p>
            <p className={styles["deal-specs"]}>
              128GB,12RAM,6.2inches,2k Display,4k Front Camera
            </p>
            <p className={styles["deal-price"]}>
              Ksh 20,000{" "}
              <span className={styles["deal-odd-price"]}>30,000</span>
            </p>
            <p className={styles["deal-store"]}>At Jumia</p>
            <p className={styles["deal-tag"]}>-32%</p>
            <div className={styles["deal-favorite"]}>
              <Favorite
                style={{
                  height: "15px",
                  width: "15px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Deals;
