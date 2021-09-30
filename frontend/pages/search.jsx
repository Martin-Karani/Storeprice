import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import SearchIcon from "../public/search.svg";
import useForm from "../components/hooks/useForm";

import styles from "../styles/Search.module.css"; /*  */

function Search() {
  const router = useRouter();
  const { input, handleSubmit, handleChange } = useForm(search, {});

  function search() {}
  return (
    <div>
      <div className={styles["search"]}>
        <div className={styles["search__content"]}>
          <button className={styles["x"]} onClick={() => router.back()}>
            &times;
          </button>
          <input
            type="search"
            id=""
            placeholder="Search..."
            name="search"
            value={input.search}
            autoComplete="off"
            onChange={handleChange}
          />

          <Link href="/searchresults">
            <button className={styles["svg-wrapper"]} onClick={handleSubmit}>
              <Image src={SearchIcon} alt="" height="20px" width="20px" />
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
      <div className="overlay" onClick={() => router.back()}></div>
    </div>
  );
}

export default Search;
