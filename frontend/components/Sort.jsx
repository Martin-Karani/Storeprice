import React from "react";
import useForm from "./hooks/useForm";

import styles from "../styles/Filter.module.css";

function Sort({ setIsSortVisible }) {
  const { input, handleChange, handleSubmit } = useForm(sortCallback, {
    sort: "Relevance",
  });

  function sortCallback() {}
  return (
    <>
      <ul className={styles["sort"]}>
        <button className="close" onClick={() => setIsSortVisible(false)}>
          &times;
        </button>
        <li className="category-name"> Sort By</li>
        <li>
          <input
            type="radio"
            name="sort"
            id="relevance"
            value="Relevance"
            onChange={handleChange}
          />
          <label htmlFor="relevance">Relevance</label>
        </li>
        <li>
          <input
            type="radio"
            name="sort"
            id="lowest"
            value="Lowest"
            onChange={handleChange}
          />
          <label htmlFor="lowest">Price (Lowest First)</label>
        </li>
        <li>
          <input
            type="radio"
            name="sort"
            id="highest"
            value="Highest"
            onChange={handleChange}
          />
          <label htmlFor="highest">Price (Highest First)</label>
        </li>
        <li>
          <input
            type="radio"
            name="sort"
            id="new"
            value="new"
            onChange={handleChange}
          />
          <label htmlFor="new"> What's New</label>
        </li>
      </ul>
      <div className="overlay" onClick={() => setIsSortVisible(false)}></div>
    </>
  );
}

export default Sort;
