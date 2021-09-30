import React, { useContext, useState } from "react";
import Image from "next/image";
import { AuthContext } from "./context/auth";
import MultiRangeSlider from "./MultiRangeSlider";

import DropDownIcon from "../public/down-arrow.svg";
import styles from "../styles/ProductsPage.module.css";

function Filter2() {
  const [filters, setFilters] = useState({});

  const { toggleSelected, setToggleSelected } = useContext(AuthContext);

  const handleCompareFilterField = (e) => {
    let filter = e.target.name;
    if (filters[`${filter}`] !== undefined) {
      setFilters({
        ...filters,
        [e.target.name]: !filters[`${filter}`],
      });
    } else {
      setFilters({
        ...filters,
        [e.target.name]: true,
      });
    }
  };

  const handleCompare = () => {
    setToggleSelected();
  };

  return (
    <div className={styles["filter2"]}>
      <h1 className="category-name">Filters</h1>
      <div className={styles["filter2-sort"]}>
        <button
          className={
            toggleSelected
              ? styles["compare-btn"] + styles["compare-active"]
              : styles["compare-btn"]
          }
          onClick={handleCompare}
        >
          {toggleSelected ? `Cancel Compare` : "Add To Compare"}
        </button>
        <select>
          <option value="" selected>
            Sort By
          </option>
          <option value="">Relevance</option>
          <option value="">Price(Lowest First)</option>
          <option value="">Price(Highest First)</option>
          <option value="">What's New</option>
        </select>
      </div>

      <ul className={styles["filter-list"]}>
        <div>
          <input
            type="checkbox"
            name="price"
            id={styles["filter-price"]}
            className="none"
            onChange={handleCompareFilterField}
          />

          <label htmlFor="filter-price">
            <div className={styles["filter2-title"]}>
              <h3 className={styles["filter2-price"]}>Price</h3>
              {filters.price === true ? (
                <Image
                  src={DropDownIcon}
                  alt=""
                  height="10px"
                  width="10px"
                  style={{ transform: "rotate(180deg)" }}
                />
              ) : (
                <Image src={DropDownIcon} alt="" height="10px" width="10px" />
              )}
            </div>
          </label>

          {(filters.price === undefined || filters.price === true) && (
            <MultiRangeSlider
              min={0}
              max={1000}
              onChange={({ min, max }) =>
                console.log(`min = ${min}, max = ${max}`)
              }
            />
          )}
        </div>
        <li>
          <input
            type="checkbox"
            name="ram"
            id="filter-ram"
            className="none"
            onChange={handleCompareFilterField}
          />
          <label htmlFor="filter-ram" className={styles["filter2-title"]}>
            <h3>Ram</h3>
            {filters.ram === true ? (
              <Image
                src={DropDownIcon}
                alt=""
                height="10px"
                width="10px"
                style={{ transform: "rotate(180deg)" }}
              />
            ) : (
              <Image src={DropDownIcon} alt="" height="10px" width="10px" />
            )}
          </label>
          {(filters.ram === undefined || filters.ram === true) && (
            <>
              <label className={styles["filter2-item"]}>
                <input type="checkbox" name="" className={styles["start"]} />
                <span className="">4GB</span>
                <p className={styles["no-of-items"]}>(45)</p>
              </label>
              <label className={styles["filter2-item"]}>
                <input type="checkbox" name="" className={styles["start"]} />
                <span className="">6GB</span>
                <p className={styles["no-of-items"]}>(45)</p>
              </label>
              <label className={styles["filter2-item"]}>
                <input type="checkbox" name="" className={styles["start"]} />
                <span className="">8GB</span>
                <p className={styles["no-of-items"]}>(45)</p>
              </label>
              <label className={styles["filter2-item"]}>
                <input type="checkbox" name="" className={styles["start"]} />
                <span className="">16GB</span>
                <p className={styles["no-of-items"]}>(45)</p>
              </label>
            </>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Filter2;
