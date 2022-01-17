import { useState } from "react";
import RightArrow from "../public/right-arrow.svg";
import DownArrow from "../public/down-arrow.svg";
import Tick from "../public/tick.svg";
import Empty from "./Empty";
import Image from "next/image";

import styles from "../styles/ProductDetails.module.css";
import Samsung from "../public/jumia-logo.svg";

const OnlinePriceCard = ({ onlinePrices }) => {
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    setInput({
      [e.target.value]: e.target.checked,
    });
  };

  return (
    <div className={styles["stores__online "] + styles["space-bottom"]}>
      <h3 className={styles["online-store-name "] + " category-name"}>
        Online Shops
      </h3>
      <div
        className={
          styles["inStore__filterSort "] + " flex-row justify-space-btwn"
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
      {onlinePrices.length > 0 ? (
        onlinePrices.map(({ _id, onlineSite, storeName, price }, index) => (
          <div className={styles["stores__online-cardFull"]} key={index}>
            <form className={styles["stores__online-card"]}>
              <label className={styles["more-icon"]}>
                <Image src={DownArrow} alt="" height="10px" width="10px" />

                <input
                  type="checkbox"
                  name="more"
                  value={_id}
                  onClick={handleChange}
                />
              </label>
              <div className={styles["stores__online-card__right"]}>
                <div className="flex-row align-center">
                  <figure>
                    <Image src={Samsung} alt="" height="50px" width="50px" />
                  </figure>
                  <div>
                    <p className={styles["stores__online-name"]}>
                      {onlineSite}
                    </p>
                    <p className={styles["stores__online-store"]}>
                      {storeName}
                    </p>
                  </div>
                </div>
                <div></div>
              </div>
              <div className={styles["stores__online-card__left"]}>
                <p className={styles["stores__online-price"]}>Ksh {price}</p>
                <div className="flex-row align-center">
                  <div className={styles["stores__online-seeMore"]}>
                    See More
                  </div>
                  <div
                    className={styles["stores__online-arrow "] + "svg-wrapper"}
                  >
                    <Image src={RightArrow} alt="" height="10px" width="10px" />
                  </div>
                </div>
              </div>
            </form>

            {input[_id] && (
              <ul className={styles["stores-showMore"]}>
                <li className="flex-row align-center">
                  <div>
                    <Image
                      src={Tick}
                      className="tick"
                      alt=""
                      height="10px"
                      width="10px"
                    />
                  </div>
                  <span>Free Delivery</span>
                </li>
                <li className="flex-row align-center">
                  <div>
                    <Image
                      src={Tick}
                      className="tick"
                      alt=""
                      height="10px"
                      width="10px"
                    />
                  </div>
                  <span>Free Installation</span>
                </li>
              </ul>
            )}
          </div>
        ))
      ) : (
        <Empty error="OOPs no Online Store Prices" />
      )}
    </div>
  );
};

export default OnlinePriceCard;
