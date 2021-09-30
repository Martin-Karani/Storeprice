import { useState } from "react";
import styles from "../styles/Filter.module.css";

const initialstate = {
  brand: [],
  color: [],
  storage: [],
  ram: [],
};

function FilterMore({ visible }) {
  const [currentCategory, setCurrentCategory] = useState("price");
  const [inputFilter, setInputFilter] = useState(initialstate);

  const handleFilter = (e) => {
    setCurrentCategory(e.target.value);
  };
  const handleValueChange = (e) => {
    const name = initialstate[e.target.name];

    if (name.includes(e.target.value)) {
      e.target.checked &&
        setInputFilter({
          ...inputFilter,
          [e.target.name]: name.filter((value) => !(value === e.target.value)),
        });
    } else {
      name.push(e.target.value);
      setInputFilter({
        ...inputFilter,
        [e.target.name]: name,
      });
    }
  };
  return (
    <>
      <div className={styles["filterMore"]}>
        <div
          className={"flex-row justify-space-btwn " + styles["filter-title"]}
        >
          <button className="close" onClick={() => visible(false)}>
            &times;
          </button>
          <div>
            <div className="category-name">
              Filters
              <p className={styles["total-filter-products"]}>4849 Products</p>
            </div>
            <ul className={"flex-row " + styles["current-filters"]}>
              {Object.values(inputFilter).map(
                (value) =>
                  value.length > 0 && value.map((val) => <li>{val}</li>)
              )}
            </ul>
          </div>
          <button
            className={styles["reset-filter-btn"]}
            onClick={() => setInputFilter({})}
          >
            Reset Filters
          </button>
        </div>
        <div className={styles["filter-keys"]}>
          <label className={currentCategory === "brand" && "active"}>
            <input
              type="radio"
              name="filter"
              value="brand"
              onClick={handleFilter}
            />
            Brand
          </label>
          <label className={currentCategory === "price" && "active"}>
            <input
              type="radio"
              name="filter"
              value="price"
              onClick={handleFilter}
            />
            Price
          </label>
          <label className={currentCategory === "color" && "active"}>
            <input
              type="radio"
              name="filter"
              value="color"
              onClick={handleFilter}
            />
            Color
          </label>
          <label className={currentCategory === "storage" && "active"}>
            <input
              type="radio"
              name="filter"
              value="storage"
              onClick={handleFilter}
            />
            Storage
          </label>
          <label className={currentCategory === "ram" && "active"}>
            <input
              type="radio"
              name="filter"
              value="ram"
              onClick={handleFilter}
            />
            Ram
          </label>
        </div>
        <ul className={styles["filter-values"]}>
          {currentCategory === "price" ? (
            <>
              <li className="category-name">Price</li>
              <li>
                Min Price
                <input type="number" name="" placeholder="0" />
              </li>
              <li>
                Max Price
                <input type="number" name="" placeholder="3000" />
              </li>
            </>
          ) : (
            <>
              <li className="category-name">Brand</li>
              <li className="flex-row align-center">
                <label>
                  <input
                    type="checkbox"
                    name="brand"
                    value="Samsung"
                    onClick={handleValueChange}
                  />
                  Samsung <span className={styles["no-of-items"]}>(400)</span>
                </label>
              </li>
              <li className="flex-row align-center">
                <label>
                  <input
                    type="checkbox"
                    name="brand"
                    value="Apple"
                    onClick={handleValueChange}
                  />
                  Apple <span className={styles["no-of-items"]}>(12)</span>
                </label>
              </li>
              <li className="flex-row align-center">
                <label>
                  <input
                    type="checkbox"
                    name="brand"
                    value="Nokia"
                    onClick={handleValueChange}
                  />
                  Nokia <span className={styles["no-of-items"]}>(50)</span>
                </label>
              </li>
            </>
          )}
        </ul>

        <button
          className={styles["btn-cancel "] + styles["filter-cancel"]}
          onClick={() => visible(false)}
        >
          Cancel
        </button>
        <button className={styles["btn-post "] + styles["filter-apply"]}>
          Apply Filters
        </button>
      </div>
      <div className="overlay" onClick={() => visible(false)}></div>
    </>
  );
}

export default FilterMore;
