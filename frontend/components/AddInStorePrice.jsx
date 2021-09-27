import Image from "next/image";
import React from "react";

import NavBar from "./NavBar";
import styles from "./AddInStore.module.css";

function AddInStorePrice() {
  return (
    <div>
      <NavBar />
      <ul className={`${styles["products-images"]}  ${styles["flex-row"]}`}>
        {[...Array(5)].map(() => (
          <li>
            <Image src="#" alt="" />
          </li>
        ))}
      </ul>
      <div>Make Sure Your Product following Same Properties</div>
      <ul>
        <li>Key Properties</li>
        <li>Key Properties</li>
        <li>Key Properties</li>
      </ul>
      <label>
        <input type="checkbox" name="" id="" />
        <p>I have Confirmed My Product as above Properties</p>
      </label>
      <label className="">
        Add Your Store Price
        <input type="number" name="" id="" />
      </label>
      <div className={styles["flex-row"]}>
        <button className="secordary-btn">Cancel</button>
        <button className="primary-btn">Add Your Price</button>
      </div>
    </div>
  );
}

export default AddInStorePrice;
