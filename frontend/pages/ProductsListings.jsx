import React, { useContext, useState } from "react";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import "../styles/products-page.css";

import NavBar from "../components/NavBar";
import Space from "../components/Space";
import Products from "../components/Products";
import { useHistory } from "react-router-dom";
import { ScrollToTop } from "../utils";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";
import { AuthContext } from "../context/auth";
import Filter2 from "../components/Filter2";
import LargeNavBAr from "../components/LargeNavBAr";

function ProductsListings() {
  const [filter, setFilter] = useState("Brands");
  const {
    selectedProducts,
    toggleSelected,
    setToggleSelected,
    setSelectedProducts,
  } = useContext(AuthContext);
  const totalSelected = selectedProducts.length;
  const history = useHistory();
  ScrollToTop();

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    onError(err) {
      console.log(err);
    },
  });

  // if (loading || !data) return "Loading";
  if (error) return "Error";

  return (
    <>
      {window.innerWidth > 960 ? (
        <LargeNavBAr />
      ) : (
        <NavBar name="MOBILE PHONES" />
      )}
      {loading || !data ? (
        <Loader />
      ) : (
        <div className="products-page">
          <div className=" ">
            <div className="product-page__categories">
              <span
                onClick={() => setFilter("Brands")}
                className={
                  filter === "Brands" ? "main-filter active" : "main-filter"
                }
              >
                Brands
              </span>
              <span
                onClick={() => setFilter("Prices")}
                className={
                  filter === "Prices" ? "main-filter active" : "main-filter"
                }
              >
                Prices
              </span>
            </div>
            {filter === "Brands" && (
              <ul className="product-page__sub-categories">
                {[...Array(5)].map((_, index) => (
                  <li key={index}>Samsung</li>
                ))}
              </ul>
            )}
            {filter === "Prices" && (
              <ul className="product-page__sub-categories">
                <li>
                  <div className="img-wrapper">
                    <img src="#" alt="" />
                  </div>
                  <p>10,000-20,000</p>
                </li>
                <li>
                  <div className="img-wrapper">
                    <img src="#" alt="" />
                  </div>
                  <p>20,000 - 35,000</p>
                </li>
                <li>
                  <div className="img-wrapper">
                    <img src="#" alt="" />
                  </div>
                  <p>40,000- Above</p>
                </li>
              </ul>
            )}
            <Space />
          </div>
          <div className="filter-products">
            {window.innerWidth > 960 ? <Filter2 /> : <Filter />}
            <div className="products-container">
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
                <div className="selected-products">
                  <h4>Selected Products ({totalSelected})</h4>
                  <ul className="flex-row selected-list">
                    {selectedProducts.map((product, index) => (
                      <li key={index}>{product.name}</li>
                    ))}
                  </ul>
                  <div className="flex-row">
                    <button
                      className="cancel-selected-btn"
                      onClick={() => (
                        setToggleSelected(), setSelectedProducts([])
                      )}
                    >
                      Cancel
                    </button>

                    <button
                      className="compare-btn"
                      onClick={() => history.push("/compare")}
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

export default ProductsListings;
