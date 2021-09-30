import React from "react";
import Link from "next/link";

import Phone from "../public/call.svg";
import Verified from "../public/verified.svg";
import LocationIcon from "../public/placeholder.svg";
import Empty from "./Empty";

import styles from "../styles/ProductDetails.module.css";

function InStorePrices({ inStorePrices }) {
  return (
    <div className={styles["shop-nearby"]}>
      <h3 className="category-name">Shops Nearby</h3>
      <div
        className={
          styles["inStore__filterSort  "] + " flex-row justify-space-btwn"
        }
      >
        <div className={styles["region-filter"]}>
          <span>Filter</span>
          <select>
            <option value="Nairobi">Nairobi</option>
          </select>
        </div>
        <div className={styles["region-filter"]}>
          <span>Sorted By</span>
          <select>
            <option value="Nairobi">Price</option>
          </select>
        </div>
      </div>
      {inStorePrices.length > 0 ? (
        inStorePrices.map((store, index) => (
          <Link
            to={`/stores/webstores/${store.storeId}`}
            className={styles["local-stores__card"]}
            key={index}
          >
            <div className={styles["local-stores__card-right"]}>
              <img src="#" alt="" />
            </div>
            <div className={styles["local-stores__card-middle"]}>
              <div className={styles["local-store__name"]}>
                {store.store.storeName}
              </div>
              <div className={styles["local-store__price"]}>
                Ksh {store.price}
                {/* <span className="italic">Updated 1 month ago</span> */}
              </div>
              <div className={styles["local-store__location-hint"]}>
                <LocationIcon style={{ width: "12px", height: "12px" }} />
                {store.store.location}
              </div>
              <div>
                <Verified />
              </div>
            </div>
            <div>
              <div className={styles["local-stores__card-left"]}>
                <button className={styles["make-offer-btn"]}>Make Offer</button>
                <button className={styles["local-stores__phone"]}>
                  Call
                  <Phone
                    style={{
                      height: "10px",
                      width: "10px",
                      marginLeft: "5px",
                    }}
                    fill="green"
                  />
                </button>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <Empty error="No Stores Near you with this Product in Our Database" />
      )}
    </div>
  );
}

export default InStorePrices;
