import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { AuthContext } from "./context/auth";
import { GET_PRODUCTS } from "./graphql/queries";

import styles from "../styles/ProductsPage.module.css";
// import { ScrollToTop } from "../utils";

import Filter from "./Filter";
import Footer from "./Footer";
import Loader from "./Loader";
import NavBar from "./NavBar";
import Space from "./Space";
import Products from "./Products";
import Filter2 from "./Filter2";
import LargeNavBAr from "./LargeNavBAr";

function ProductsList() {
  const [filter, setFilter] = useState("Brands");

  const {
    selectedProducts,
    toggleSelected,
    setToggleSelected,
    setSelectedProducts,
  } = useContext(AuthContext);

  const totalSelected = selectedProducts.length;

  const router = useRouter();

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    onError(err) {
      console.log(err);
    },
    variables: { category: "Phones" },
  });

  // if (loading || !data) return "Loading";
  // if (error) return "Error";
  //
  return (
    <>
      <LargeNavBAr />

      <NavBar name="MOBILE PHONES" />

      {loading || !data ? (
        <Loader />
      ) : (
        <div className={styles["products-page"]}>
          <div className=" ">
            <div className={styles["product-page__categories"]}>
              <span
                onClick={() => setFilter("Brands")}
                className={
                  filter === "Brands"
                    ? styles["main-filter "] + styles["active"]
                    : styles["main-filter"]
                }
              >
                Brands
              </span>
              <span
                onClick={() => setFilter("Prices")}
                className={
                  filter === "Prices"
                    ? styles["main-filter "] + styles["active"]
                    : styles["main-filter"]
                }
              >
                Prices
              </span>
            </div>
            {filter === "Brands" && (
              <ul className={styles["product-page__sub-categories"]}>
                {[...Array(5)].map((_, index) => (
                  <li key={index}>Samsung</li>
                ))}
              </ul>
            )}
            {filter === "Prices" && (
              <ul className={styles["product-page__sub-categories"]}>
                <li>
                  <figure>
                    <img src="#" alt="" />
                  </figure>
                  <p>10,000-20,000</p>
                </li>
                <li>
                  <figure>
                    <img src="#" alt="" />
                  </figure>
                  <p>20,000 - 35,000</p>
                </li>
                <li>
                  <figure>
                    <img src="#" alt="" />
                  </figure>
                  <p>40,000- Above</p>
                </li>
              </ul>
            )}
            <Space />
          </div>
          <div className={styles["filter-products"]}>
            <Filter2 />
            <Filter />
            <div className={styles["products-container"]}>
              <div className="flex-row justify-space-btwn align-center">
                <h1 className="category-name">366 Products</h1>
                <ul className="flex-row justify-space-btwn align-center">
                  {/* {toggleSelected && (
                    <li
                      className="filter-active"
                      onClick={() => (
                        setToggleSelected(), setSelectedProducts([])
                      )}
                    >
                      Remove Compare x
                    </li>
                  )} */}
                  {/* <li className="filter-active">Samsung x</li>
              <li className="filter-active">Samsung x</li> */}
                </ul>
              </div>
              {toggleSelected && totalSelected > 0 && (
                <div className={styles["selected-products"]}>
                  <h4>Selected Products ({totalSelected})</h4>
                  <ul className={styles["selected-list"]}>
                    {selectedProducts.map((product, index) => (
                      <li key={index}>{product.name}</li>
                    ))}
                  </ul>
                  <div className="flex-row">
                    <button
                      className={styles["cancel-selected-btn"]}
                      onClick={() => (
                        setToggleSelected(), setSelectedProducts([])
                      )}
                    >
                      Cancel
                    </button>

                    <button
                      className={styles["compare-btn"]}
                      onClick={() => router.push("/compare")}
                    >
                      Compare
                    </button>
                  </div>
                </div>
              )}
              <Products products={data.getProducts} />
            </div>
          </div>
        </div>
      )}
      <Space />

      <Footer />
    </>
  );
}

export default ProductsList;
