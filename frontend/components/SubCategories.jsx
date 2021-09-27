import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { ReactComponent as RightArrow } from "../resources/right-arrow.svg";
import Space from "../components/Space";
import styles from "./SubCategories.module.css";
import ProductCardContainer from "../components/ProductCardContainer";
import { Link, withRouter } from "react-router-dom";
import { ScrollToTop } from "../utils";
import LargeNavBAr from "../components/LargeNavBAr";
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
  // console.log(category);
  ScrollToTop();

  const [subCategories] = useState(initialState);
  return (
    <div className={stylse["sub-categories__nav"]}>
      <ul>
        {subCategories.map((subCategory, index) => (
          <Link
            to={`/phones/${subCategory.name}`}
            className={styles["sub-categories__item"]}
            key={index}
          >
            <div className="flex-row align-center">
              <div
                className={"img-wrapper" + styles["sub-categories__nav-img"]}
              >
                <img src="#" alt="" />
              </div>
              <p>{subCategory.name}</p>
            </div>
            <div
              className={"img-wrapper" + styles["sub-categories__nav-arrow"]}
            >
              <RightArrow style={{ height: "10px", width: "10px" }} />
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
      {window.innerWidth > 960 ? (
        <LargeNavBAr />
      ) : (
        <NavBar name="MOBILE &#38; ACCESSORIES" />
      )}

      <SubCategoryListings />

      <ProductCardContainer />
    </div>
  );
}

export default withRouter(SubCategories);
