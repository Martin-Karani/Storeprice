import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import NavBar from "./NavBar";
import LargeNavBAr from "./LargeNavBAr";
import Space from "./Space";
import ProductCardContainer from "./ProductCardContainer";
// import { ScrollToTop } from "../utils";
// import { Link, withRouter } from "react-router-dom";
import styles from "../styles/Category.module.css";
import RightArrow from "../public/right-arrow.svg";
// import SubCategoryListings from "../components/SubCategoryListings";

const initialState = [
  { name: "Mobile Phones", img: "url" },
  { name: "Phones Accessories", img: "url" },
  { name: "Smart Watches", img: "url" },
  { name: "Watches Accessories", img: "url" },
  { name: "Cases,Covers & Skin", img: "url" },
  { name: "Headsets", img: "url" },
];
function SubCategoryListings({ route }) {
  // ScrollToTop();

  const [subCategories] = useState(initialState);

  return (
    <div className={styles["sub-categories__nav"]}>
      <ul>
        {subCategories.map((subCategory, index) => (
          <Link href={`/phones/${subCategory.name}`} key={index}>
            <div className={styles["sub-categories__item"]}>
              <div className="flex-row align-center">
                <div
                  className={"img-wrapper " + styles["sub-categories__nav-img"]}
                >
                  <Image src="/" alt="" layout="fill" />
                </div>
                <p>{subCategory.name}</p>
              </div>
              <div
                className={"img-wrapper " + styles["sub-categories__nav-arrow"]}
              >
                <Image src={RightArrow} alt="" height="10px" width="10px" />
              </div>
            </div>
          </Link>
        ))}
      </ul>
      <Space />
    </div>
  );
}

function SubCategories() {
  return (
    <div className={styles["sub-categories"]}>
      <LargeNavBAr />

      <NavBar name="MOBILE &#38; ACCESSORIES" />

      <SubCategoryListings />

      <ProductCardContainer />
    </div>
  );
}

export default SubCategories;
