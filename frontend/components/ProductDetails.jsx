import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import { GET_PRODUCT } from "../graphql/queries";
import { NetworkStatus, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { ScrollToTop } from "../utils";
import { ViewRating } from "../components/Rating";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Review from "../components/Review";
import Space from "../components/Space";
import OnlinePriceCard from "../components/OnlinePriceCard";
import InStorePrices from "../components/InStorePrices";
import Questions from "../components/Questions";
import LargeNavBAr from "../components/LargeNavBAr";
import Loader from "../components/Loader";

import { ReactComponent as Tick } from "../public/tick.svg";
import { ReactComponent as Heart } from "../public/heart.svg";
import { ReactComponent as HeartFill } from "../public/heartFull.svg";
import { ReactComponent as Negative } from "../public/cancel-mark.svg";
import Samsung from "../public/samsung.jpeg";
import styles from ".ProductDetails.module.css";

function ProductDetails() {
  ScrollToTop();
  const [toggleSimilar, setToggleSimilar] = useState(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const id = router.query;
  const [toggleFavorite, setToggleFavorite] = useState(false);
  const {
    loading,
    error,
    data,
    refetch: getProductRefetch,
    networkStatus,
  } = useQuery(GET_PRODUCT, {
    variables: { productId: id },
    notifyOnNetworkStatusChange: true,
  });

  if (loading || networkStatus === NetworkStatus.refetch) return <Loader />;
  if (error) return "error";
  const product = data.getProduct;

  return (
    <>
      {window.innerWidth > 960 ? <LargeNavBAr /> : <NavBar />}
      <div className={styles["product-details"]}>
        <div className={styles["grid"]}>
          <ul className={styles["img-slider"]}>
            {[...Array(6)].map((_, index) => (
              <li key={index}>
                <img src={Samsung} alt="" />
              </li>
            ))}
          </ul>
          <div className={styles["details-left"]}>
            <button
              className={styles["similar-btn"]}
              onClick={() => setToggleSimilar(true)}
            >
              View Similar
            </button>
            <h3 className={styles["details-brand"]}>SAMSUNG</h3>
            <h2 className={styles["phone-details__name"]}>{product.name}</h2>
            <div
              className={"flex-row" + styles["favorite-icon"]}
              onClick={() => setToggleFavorite(!toggleFavorite)}
            >
              {toggleFavorite ? (
                <HeartFill
                  style={{
                    height: "15px",
                    width: "15px",
                    fill: "red",
                  }}
                />
              ) : (
                <>
                  <Heart
                    style={{
                      height: "15px",
                      width: "15px",
                    }}
                  />
                </>
              )}
            </div>
            <ul className={styles["quick-features"]}>
              <li className="">Key Features:</li>
              {product.quickFeatures.map((feature, index) => (
                <li
                  className={styles["positive"] + "flex-row align-center"}
                  key={index}
                >
                  {feature.positive ? (
                    <Tick
                      className={styles["tick"]}
                      fill="green"
                      style={{ marginRight: "5px" }}
                    />
                  ) : (
                    <Negative
                      className={styles["tick"]}
                      fill="red"
                      style={{ marginRight: "5px" }}
                    />
                  )}

                  <span>{feature.feature}</span>
                </li>
              ))}
            </ul>
            <ul className={styles["details-imgs"]}>
              <li className={styles["details-img"]}>
                <img src="#" alt="" />
              </li>
              <li className={styles["details-img"]}>
                <img src="#" alt="" />
              </li>
              <li className={styles["details-img"]}>
                <img src="#" alt="" />
              </li>
              <li className={styles["details-img"]}>
                <img src="#" alt="" />
              </li>
            </ul>
          </div>
          <div className={styles["details-right"]}>
            <div className="">
              <div
                className={
                  styles["phone-details__rating"] +
                  "flex-row justify-space-btwn"
                }
              >
                <p>Ratings</p>
                <ViewRating />
              </div>
            </div>

            <div className={styles["phone-details__price-range"]}>
              <div className="flex-row justify-space-btwn">
                <p>Price</p>
                <p className={styles["details__price"]}>
                  Ksh 39,000 - Ksh 42,000
                </p>
              </div>
            </div>
            <h4> Colors: </h4>
            <ul className={styles["variations-list"]}>
              <li>
                <img src="#" alt="" />
              </li>
              <li>
                <img src="#" alt="" />
              </li>
              <li>
                <img src="#" alt="" />
              </li>
              <li>
                <img src="#" alt="" />
              </li>
            </ul>
          </div>
          <Space class1="destop-none" />
        </div>

        <div className={styles["details-bottom"]}>
          <div className={styles["desktop-flex"]}>
            <OnlinePriceCard onlinePrices={product.onlinePrices} />
            <Space class1="destop-none" />
            <InStorePrices inStorePrices={product.inStorePrices} />
          </div>
          <Space class1="destop-none" />

          <div>
            <h3 className="category-name">Product Details</h3>
            <p className={styles["category-name__desc"]}>
              Its Know mustly because of the remarkable main camera and selfie
            </p>
            <div>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex
              asperiores, quos eveniet eius eaque quaerat harum voluptatem
              dolorum fugiat corporis deserunt, nisi odio. Nemo, fuga. Nam atque
              asperiores fugit dolore?
            </div>
            <table width="100%" className={styles["specs-table"]}>
              <tbody>
                <th className={styles["spec-category"]} colSpan="2">
                  GENERAL
                </th>
                <tr>
                  <td className={styles["spec-name"]}>Sim Type</td>
                  <td className={styles["spec-detail"]}>Dual Sim,GSM+GSM</td>
                </tr>
                <tr>
                  <td className={styles["spec-name"]}>Sim Type</td>
                  <td className={styles["spec-detail"]}>Dual Sim,GSM+GSM</td>
                </tr>
                <tr>
                  <td className={styles["spec-name"]}>
                    Sim Type and very nell
                  </td>
                  <td className={styles["spec-detail"]}>Dual Sim,GSM+GSM</td>
                </tr>
                <th className="spec-category" colSpan="2">
                  GENERAL
                </th>
                <tr>
                  <td className={styles["spec-name"]}>Sim Type</td>
                  <td className={styles["spec-detail"]}>
                    Dual Sim,GSM+GSM ansd very tinmeiscear
                  </td>
                </tr>
                <tr>
                  <td className={styles["spec-name"]}>Sim Type</td>
                  <td className={styles["spec-detail"]}>Dual Sim,GSM+GSM</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Space />
          <Review />
          <Space />
          <div className={styles["price-history"]}>
            <h3 className="category-name">Price History</h3>
            <div className="">Product Price History Coming Soon</div>
          </div>
          <Space />
          <Questions
            questions={product.questions}
            productId={product._id}
            productName={product.name}
            getProductRefetch={getProductRefetch}
          />
          <Space />

          <div>
            <h3 className="category-name">Additional Info</h3>
            <div className="flex-row justify-space-btwn">
              <p>Created by StorePrices</p>
              <p>March 20, 2020</p>
            </div>
          </div>
          {/* <CompareProductCard /> */}
          <Space />
          <h3>MORE LIKE</h3>
          <h1>Samsung</h1>

          <table className={styles["more-like"]}>
            <tbody>
              <tr>
                {[...Array(5)].map((_, index) => (
                  <td key={index}>
                    <div className={styles["more-like__img"]}>
                      <img src={Samsung} alt="" />
                    </div>
                    <div className={styles["more-like__product-name"]}>
                      Samsung S9 Plus
                    </div>
                    <div className={styles["more-like__product-price"]}>
                      KSH 40,000
                    </div>
                    <ViewRating />
                  </td>
                ))}
              </tr>
            </tbody>
            <thead>Ram </thead>
            <tbody>
              <tr>
                <td>6GB</td>
                <td>5GB</td>
                <td>6GB</td>
                <td>5GB</td>
                <td>5GB</td>
              </tr>
            </tbody>
            <thead>Storage</thead>
            <tbody>
              <tr>
                <td>64GB</td>
                <td>128GB</td>
                <td>32GB</td>
                <td>64GB</td>
                <td>64GB</td>
              </tr>
            </tbody>

            <thead>Storage</thead>
            <tbody>
              <tr>
                <td>64GB</td>
                <td>128GB</td>
                <td>32GB</td>
                <td>64GB</td>
                <td>64GB</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Space />

        <Footer />
        {toggleSimilar && (
          <div className={styles["visible"]}>
            <div
              className="overlay"
              onClick={() => setToggleSimilar(false)}
            ></div>
            <div className={styles["similar-card"]}>
              <button className="close" onClick={() => setToggleSimilar(false)}>
                &times;
              </button>
              <h3>Similar To</h3>
              <p>{product.name}</p>
              <div className={styles["similar-card-wrapper"]}>
                {[...Array(5)].map((_, index) => (
                  <div className={styles["similar-product-card"]} key={index}>
                    <div className="img-wrapper">
                      <img src={Samsung} alt="" />
                    </div>
                    <div>
                      <p className={styles["product-name"]}>SAMSUNG S10</p>
                      <p className={styles["price"]}>Ksh 20,000</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {user && user.isStore && (
          <Link href="/add-instore-price">
            <button className={styles["addInstore-price-btn"]}>+</button>
          </Link>
        )}
      </div>
    </>
  );
}

export default ProductDetails;
