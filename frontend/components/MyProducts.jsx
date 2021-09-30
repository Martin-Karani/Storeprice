import { useState } from "react";
import Image from "next/image";
import styles from "../styles/MyProducts.module.css";

function MyProducts({ showMyProducts }) {
  const [myProducts, setMyProducts] = useState("recently");
  return (
    <>
      <div className={styles["my-products"]}>
        <button className="close" onClick={() => showMyProducts(false)}>
          &times;
        </button>
        {myProducts === "recently" && (
          <>
            <h3 className="category-name">Recently Visited</h3>
            <ul className={styles["recently-visited"]}>
              {[...Array(4)].map(() => (
                <li className="flex-row align-center">
                  <figure className={styles["my-products-img-wrapper"]}>
                    <Image src="#" alt="" />
                  </figure>
                  <p className={styles["my-products-name"]}>Samsung S9+</p>
                </li>
              ))}
            </ul>
          </>
        )}
        {myProducts === "favourites" && (
          <>
            <h3 className="category-name">My Favorites</h3>
            <ul className={styles["recently-visited"]}>
              {[...Array(3)].map(() => (
                <li className="flex-row align-center">
                  <div className={styles["my-products-img-wrapper"]}>
                    <img src="#" alt="" />
                  </div>
                  <p className={styles["my-products-name"]}>Samsung S9+</p>
                </li>
              ))}
            </ul>
          </>
        )}
        {myProducts === "profile" && (
          <>
            <h3 className="category-name">My Profile</h3>
            <div>
              <img src="#" alt="" />
            </div>
            <p>Martin Karani</p>
            <ul>
              <li>My Questions</li>
              <li>My Answers</li>
            </ul>
            <ul>
              <li>
                <div>Samsung S10+</div>
                <p>Whats the display ?</p>
                <p>12 March 2022</p>
                <p>Answers(1)</p>
                <ul>
                  <li>
                    <p>2k is the display</p>
                  </li>
                </ul>
              </li>
            </ul>
          </>
        )}
        <ul
          className={
            "flex-row justify-space-btwn" + styles["my-product-categories"]
          }
        >
          <li
            className={
              myProducts === "profile"
                ? styles["my-product-category"] + styles["active"]
                : styles["my-product-category"]
            }
            onClick={() => setMyProducts("profile")}
          >
            My Profile
          </li>
          <li
            className={
              myProducts === "favourites"
                ? styles["my-product-category"] + styles["active"]
                : styles["my-product-category"]
            }
            onClick={() => setMyProducts("favourites")}
          >
            My Favourites
          </li>
          {/* <li
          className={
            myProducts === "alerts"
              ? "my-product-category active"
              : "my-product-category"
          }
          onClick={() => setMyProducts("alerts")}
        >
          Price Alerts
        </li> */}
          <li
            className={
              myProducts === "recently"
                ? styles["my-product-category"] + styles["active"]
                : styles["my-product-category"]
            }
            onClick={() => setMyProducts("recently")}
          >
            Recently Visited
          </li>
        </ul>
      </div>
      <div className="overlay" onClick={() => showMyProducts(false)}></div>
    </>
  );
}

export default MyProducts;
