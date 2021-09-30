import React, { useContext } from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";

import { GET_SELECTED_PRODUCTS } from "./graphql/queries";
import { AuthContext } from "./context/auth";

import Loader from "./Loader";
import NavBar from "./NavBar";
import { ViewRating } from "./Rating";
import LargeNavBAr from "./LargeNavBAr";

import Samsung from "../public/samsung.jpeg";
import styles from "../styles/CompareCard.module.css";

function CompareProductCard() {
  const { selectedProducts } = useContext(AuthContext);

  let productIds = [];

  selectedProducts.forEach((product) => productIds.push(product.productId));

  const { loading, data } = useQuery(GET_SELECTED_PRODUCTS, {
    onError(err) {
      console.log(err);
    },
    variables: { productIds: productIds },
    // variables: [...productIds],
  });

  return (
    <div className={styles["compare-page"]}>
      <LargeNavBAr />
      <NavBar />
      {loading || !data ? (
        <Loader />
      ) : (
        <>
          <h4 className="category-name" style={{ marginLeft: "1rem" }}>
            Compare Key Features
          </h4>
          <div>
            <input type="checkbox" name="" id="hide-common" />
            <label htmlFor="hide-common">Hide Common Features</label>
          </div>

          <table className={styles["compare-table"]}>
            <tbody>
              <tr className={styles["compare-table__row"]}>
                {[...Array(5)].map((_, index) => (
                  <td className={styles["compare-table__row-item"]} key={index}>
                    <figure className={styles["compare-img"]}>
                      <Image src={Samsung} alt="" />
                    </figure>
                    <div className={styles["compare-product-name"]}>
                      Samsung S9+
                    </div>
                    <div className={styles["compare-product-price"]}>
                      Ksh 12,000
                    </div>
                    <button className={styles["compare-product__view-more"]}>
                      View More
                    </button>
                    {/* <ViewRating /> */}
                  </td>
                ))}
              </tr>
            </tbody>
            <thead>
              <th colSpan="3">
                <p className={styles["compare-property"]}>Sim Type </p>
              </th>
            </thead>
            <tbody>
              <tr>
                <td>AMOLED</td>
                <td>2400 x 1800</td>
                <td>-</td>
              </tr>
            </tbody>
            <thead>
              <th colSpan="3">
                <p className={styles["compare-property"]}>Sim Type </p>
              </th>
            </thead>
            <tbody>
              <tr>
                <td>AMOLED</td>
                <td>2400 x 1800</td>
                <td>-</td>
              </tr>
            </tbody>
            <thead>
              <th colSpan="3">
                <p className={styles["compare-property"]}>Sim Type </p>
              </th>
            </thead>
            <tbody>
              <tr>
                <td>AMOLED</td>
                <td>2400 x 1800</td>
                <td>-</td>
              </tr>
            </tbody>
            <thead>
              <th colSpan="3">
                <p className={styles["compare-property"]}>Sim Type </p>
              </th>
            </thead>
            <tbody>
              <tr>
                <td>AMOLED</td>
                <td>2400 x 1800</td>
                <td>-</td>
              </tr>
            </tbody>
            <thead>
              <th colSpan="3">
                <p className={styles["compare-property"]}>Sim Type </p>
              </th>
            </thead>
            <tbody>
              <tr>
                <td>AMOLED</td>
                <td>2400 x 1800</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default CompareProductCard;
