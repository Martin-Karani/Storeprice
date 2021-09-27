import React, { useContext, useState } from "react";
import useRouter from 'next/router'
import { AuthContext } from "./context/auth";
import useForm from "../useForm";
import FilterMore from "./FilterMore";
import Sort from "./Sort";

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
    <div className="filters">
      <div className="filter-container">
        <button className="sort-btn" onClick={() => setIsSortVisible(true)}>
          SORT BY
        </button>
        <button
          className={
            toggleSelected ? "compare-btn compare-active" : "compare-btn"
          }
          onClick={handleCompare}
        >
          {toggleSelected
            ? `Compare(${selectedProducts.length})`
            : "Add To Compare"}
        </button>
        <button className="filter-btn" onClick={() => setIsFilterVisible(true)}>
          FILTER
        </button>
      </div>

      {isSortVisible && <Sort setIsSortVisible={setIsSortVisible} />}
      {isFilterVisible && <FilterMore visible={setIsFilterVisible} />}
    </div>
  );
}

export default Filter;
