import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./context/auth";
import useForm from "./hooks/useForm";
import FilterMore from "./FilterMore";
import Sort from "./Sort";

import styles from "../styles/Filter.module.css";
function Filter() {
  const [isSortVisible, setIsSortVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const { toggleSelected, setToggleSelected, selectedProducts } =
    useContext(AuthContext);

  const router = useRouter();

  const handleCompare = () => {
    toggleSelected ? router.push("/compare") : setToggleSelected();
  };

  return (
    <div className={styles["filters"]}>
      <div className={styles["filter-container"]}>
        <button
          className={styles["sort-btn"]}
          onClick={() => setIsSortVisible(true)}
        >
          SORT BY
        </button>
        <button
          className={
            toggleSelected
              ? styles["compare-btn "] + styles["compare-active"]
              : styles["compare-btn"]
          }
          onClick={handleCompare}
        >
          {toggleSelected
            ? `Compare(${selectedProducts.length})`
            : "Add To Compare"}
        </button>
        <button
          className={styles["filter-btn"]}
          onClick={() => setIsFilterVisible(true)}
        >
          FILTER
        </button>
      </div>

      {isSortVisible && <Sort setIsSortVisible={setIsSortVisible} />}
      {isFilterVisible && <FilterMore visible={setIsFilterVisible} />}
    </div>
  );
}

export default Filter;
