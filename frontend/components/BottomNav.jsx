import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ReactComponent as StoreIcon } from "../public/store2.svg";
import { ReactComponent as CategoryIcon } from "../public/menu.svg";
import { ReactComponent as OffersIcon } from "../public/price-tag2.svg";
import { ReactComponent as ProfileIcon } from "../public/user.svg";
import { ReactComponent as AddIcon } from "../public/add.svg";
import { ReactComponent as RightArrowIcon } from "../public/right-arrow.svg";

const categories = [
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
function BottomNav() {
  const [prevScrollPos, setPrevScrollPos] = useState({
    prev: window.pageYOffset,
    visible: true,
  });

  const handleScroll = () => {
    const currectScrollPos = window.pageYOffset;
    const visible = prevScrollPos > window.pageYOffset;
    setPrevScrollPos({
      prev: currectScrollPos,
      visible: visible,
    });
  };
  const [categoriesVisible, setCategoriesVisible] = useState("");
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
  return (
    <div className="bottomNav">
      <div
        className={
          prevScrollPos.visible ? ` bottomNav--hidden bottomNav` : "bottomNav"
        }
      >
        <Link href="/deals" className="flex-column align-center">
          <StoreIcon
            style={{
              height: "13px",
              width: "13px",
              fill: "#ffffff",
              margin: "auto",
            }}
          />
          <p>Deals</p>
        </Link>

        <div
          className="flex-column align-center"
          onClick={() => setCategoriesVisible("categories")}
        >
          <OffersIcon
            style={{
              height: "13px",
              width: "13px",
              fill: "#ffffff",
              margin: "auto",
            }}
          />

          <p>Categories</p>
        </div>

        <div
          className="add-icon-wrapper"
          onClick={() => setCategoriesVisible("add-price")}
        >
          <AddIcon
            style={{
              height: "13px",
              width: "13px",
              fill: "#ffffff",
              margin: "0",
            }}
          />
        </div>
        <Link href="/stores" className="flex-column align-center">
          <div>
            <CategoryIcon
              style={{
                height: "13px",
                width: "13px",
                fill: "#ffffff",
                margin: "auto",
              }}
            />
            <p>Stores</p>
          </div>
        </Link>
        <Link href="/profile" className="flex-column align-center">
          <div>
            <ProfileIcon
              style={{
                height: "13px",
                width: "13px",
                fill: "#ffffff",
                margin: "auto",
              }}
            />
            <p>Profile</p>
          </div>
        </Link>
      </div>
      {categoriesVisible === "add-price" && (
        <>
          <div className="add-price">
            <button className="close" onClick={() => setCategoriesVisible("")}>
              &times;
            </button>
            <div>Add Your Price</div>
            <div>Update Existing Price</div>
          </div>
          <div
            className="overlay"
            onClick={() => setCategoriesVisible("")}
          ></div>
        </>
      )}
      {categoriesVisible === "categories" && (
        <>
          <div className="nav-all-categories">
            <button className="close" onClick={() => setCategoriesVisible("")}>
              &times;
            </button>
            <h3 className="category-name">All Categories</h3>
            <ul>
              {categories.map((category) => (
                <li key={category} className="flex-row justify-space-btwn">
                  <div className="flex-row align-center">
                    <div className="img-wrapper sub-categories__nav-img">
                      <Image src="#" alt="" />
                    </div>
                    <p>{category}</p>
                  </div>
                  <div className="svg-wrapper sub-categories__nav-arrow">
                    <RightArrowIcon style={{ height: "10px", width: "10px" }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="overlay"
            onClick={() => setCategoriesVisible("")}
          ></div>
        </>
      )}
    </div>
  );
}

export default BottomNav;
