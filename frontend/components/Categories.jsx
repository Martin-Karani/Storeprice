import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Categories.module.css";

const initialState = [
  "Phones",
  "Electronics",
  "Fashion",
  "Computing",
  "Shoes",
  "Laptops",
  "Tablets",
  "HardWares",
  // "cars",
  "Bikes",
  "Furniture",
];
function Categories() {
  const [categories] = useState(initialState);
  return (
    <div className={styles.categories}>
      <h3 className="category-name">Explore</h3>
      <div className={styles.category}>
        {categories.map((category, index) => (
          <Link href={`products/${category}`} key={index}>
            <div className={styles.category__item}>
              <div className={styles["category-item-icon"]}></div>
              <div className={styles["category-item-name"]}>{category}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
