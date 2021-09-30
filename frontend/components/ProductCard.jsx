import React from "react";
import Link from "next/link";
import Image from "next/image";
import Samsung from "../public/samsung.jpeg";

import styles from "../styles/ProductCardContainer.module.css";

function ProductCard({ item }) {
  return (
    <div className={styles["product-container__cards"]}>
      {item.cards.map((card, index) => (
        <Link href="/productdetails/60bb0b0ce9efce11df9d9d1b">
          <div className={styles["product-container__card"]} key={index}>
            <div className="img-wrapper">
              <Image src={Samsung} alt="ad" />
            </div>
            <div>
              <div className={styles["preview-desc"]}>{card.name}</div>
              <div className={styles["price-range"]}>{card.desc} </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductCard;
