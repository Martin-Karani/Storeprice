import React, { useState } from "react";
import Image from "next/image";

import styles from "../styles/ProductCardContainer.module.css";
import ProductCard from "./ProductCard";
import Space from "./common/Space";
import Samsung from "../public/samsung.jpeg";

const initialState = [
  {
    category: "Mobiles to Check Out",
    cards: [
      {
        image: "",
        name: "Apple 12 Pro",
        desc: "Best Selling Phones",
      },
      {
        image: "",
        name: "Techno",
        desc: "Build,Features,...",
      },
      {
        image: "",
        name: "Realme",
        desc: "Under Ksh 10,000 ",
      },
      {
        image: "",
        name: "Nokia",
        desc: "4 stars and above",
      },
      {
        image: "",
        name: "Sony",
        desc: "Best Selling Phones",
      },
      {
        image: "",
        name: "One Plus",
        desc: "Best Selling Phones",
      },
      {
        image: "",
        name: "Huwaei",
        desc: "Best Selling Phones",
      },
      {
        image: "",
        name: "Zuru",
        desc: "Best Selling Phones",
      },
      {
        image: "",
        name: "Most Loved",
        desc: "Best Selling Phones",
      },
      {
        image: "",
        name: "Most Loved",
        desc: "Best Selling Phones",
      },
      {
        image: "",
        name: "Most Loved",
        desc: "Best Selling Phones",
      },
      {
        image: "",
        name: "Most Loved",
        desc: "Best Selling Phones",
      },
    ],
  },
  {
    category: "Tech Gadgets Trending Currently ",
    cards: [
      {
        image: "",
        name: "Most Loved",
        desc: "Best Selling Phones",
      },
      {
        image: "",
        name: "Top Quality",
        desc: "Build,Features,...",
      },
      {
        image: "",
        name: "Affordable",
        desc: "Under Ksh 10,000 ",
      },
      {
        image: "",
        name: "Top Rated",
        desc: "4 stars and above",
      },
      {
        image: "",
        name: "Most Loved",
        desc: "Best Selling Phones",
      },
    ],
  },
];

function ProductCardContainer() {
  const [data] = useState(initialState);

  return (
    <div className={styles["home-main-section"]}>
      <div className={styles["dt-deals"]}>
        <h3 className={styles["today-deals"]}>Today's Deals</h3>
        <div className={styles["deals-wrapper"]}>
          {[...Array(4)].map((_, index) => (
            <div className={styles["dt-deal-item"]} key={index}>
              <figure className="img-wrapper">
                <Image src={Samsung} alt="fka" />
              </figure>
              <div className={styles["dt-deals-details"]}>
                <p>Samsung S9 Plus</p>
                <p className={styles["deal-price"]}>
                  Ksh 20,000{" "}
                  <span className={styles["deal-odd-price"]}>30,000</span>
                </p>
                <p className={styles["deal-store"]}>At Jumia</p>
                <p className={styles["deal-tag"]}>-32%</p>
              </div>
            </div>
          ))}
        </div>
        <button className="login-btn">View All</button>
      </div>

      <div className={styles["product-container"]}>
        {data.map((item, index) => (
          <div className={styles["product-container__category"]} key={index}>
            <h3 className="category-name">{item.category}</h3>
            <ProductCard item={item} />
            <Space />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCardContainer;
