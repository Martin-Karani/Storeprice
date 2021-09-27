import React from "react";
import { ReactComponent as SearchIcon } from "../public/search.svg";
import styles from "./Search.module.css"; /*  */
import { useRouter } from "next/router";
import Link from "next/link";
import useForm from "../useForm";

function Search() {
  const history = useHistory();
  const { input, handleSubmit, handleChange } = useForm(search, {});

  function search() {}
  return (
    <div>
      <div className={styles["search"]}>
        <div className={styles["search__content"]}>
          <button className="x" onClick={() => history.goBack()}>
            &times;
          </button>
          <input
            type="search"
            id=""
            placeholder="Search..."
            name="search"
            value={input.search}
            onChange={handleChange}
          />

          <Link href="/searchresults">
            <button className="svg-wrapper" onClick={handleSubmit}>
              <SearchIcon />
            </button>
          </Link>
        </div>
        <div className={styles["search__suggestions"]}>
          <h3>Top Searches</h3>
          <div className={styles["top-searches__list"]}>
            <p>Iphone12 pro max</p>
            <p>Samsung S9+</p>
            <p>Iphone12 pro max</p>
            <p>Samsung S9+</p>
            <p>Iphone12 pro max</p>
            <p>Samsung S9+</p>
            <p>Iphone12 pro max</p>
            <p>Samsung S9+</p>
          </div>
        </div>
      </div>
      {/* <div className="overlay" onClick={() => history.goBack()}></div> */}
    </div>
  );
}

export default Search;
