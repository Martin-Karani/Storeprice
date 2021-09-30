import React, { useContext, useState } from "react";
import { GET_STORE } from "../graphql/queries";
import { AuthContext } from "../context/auth";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";

import NavBar from "./NavBar";
import Products from "./Products";
import Space from "./Space";
import EditStore from "./EditStore";
import { ScrollToTop } from "../utils";
import { ViewRating } from "./Rating";
import AddStoreReview from "./AddStoreReview";
import LargeNavBAr from "./LargeNavBAr";
import Loader from "./Loader";
import { ReactComponent as LeftArrow } from "../public/left-arrow.svg";
import { ReactComponent as Call } from "../public/call.svg";
import { ReactComponent as WhatsApp } from "../public/whatsapp.svg";
import { ReactComponent as FaceBook } from "../public/facebook.svg";
import { ReactComponent as Instagram } from "../public/instagram.svg";
import { ReactComponent as Twitter } from "../public/twitter.svg";
import { ReactComponent as Share } from "../public/share.svg";
import { ReactComponent as Map } from "../public/map.svg";
import styles from "../styles/WebStore.module.css";

function WebStore() {
  ScrollToTop();
  const [toggleAddReview, setToggleAddReview] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  console.log(user);
  const { loading, data } = useQuery(GET_STORE, {
    variables: { storeId: id },
  });

  if (loading) return <Loader />;

  const store = data.getStore;

  return (
    <div className={styles["webstore"]}>
      {window.innerWidth > 969 ? <LargeNavBAr /> : <NavBar />}
      <div className={styles["webstore__header"]}>
        <div className={styles["webstore-overlay"]}>
          <div className={styles["webstore-preview"]}>
            <p className={styles["webstore__no-of-products"]}>
              {store.products.length} PRODUCTS
            </p>
            <h3 className={styles["webstore__store-name"]}>
              {store.storeName}
            </h3>
            <ViewRating />
          </div>
          {user && user.isStore && user.storeId === store._id ? (
            <EditStore store={store} />
          ) : (
            <button className={styles["follow-btn"]}>Follow</button>
          )}
        </div>
      </div>
      <div className={styles["webstore-images"]}>
        <figure className={styles["webstore-image"]}></figure>
        <figure className={styles["webstore-image"]}></figure>
      </div>
      <div className={styles["social-medias"]}>
        <div className="flex-column align-center">
          <figure className="svg-wrapper">
            <Call />
          </figure>
          <div className={styles["social-medias__name"]}>Call</div>
        </div>
        {store.whatsapp && (
          <a href="/" className="flex-column align-center">
            <div className="svg-wrapper">
              <WhatsApp />
            </div>
            <div className={styles["social-medias__name"]}>WhatsApp</div>
          </a>
        )}
        {store.instagram && (
          <a href="/fajfajd/fadjfdla" className="flex-column align-center">
            <div className="svg-wrapper">
              <Instagram />
            </div>
            <div className={styles["social-medias__name"]}>Instagram</div>
          </a>
        )}
        {store.facebook && (
          <a href="/" className="flex-column align-center">
            <div className="svg-wrapper">
              <FaceBook />
            </div>
            <div className={styles["social-medias__name"]}>FaceBook</div>
          </a>
        )}
        {store.twitter && (
          <a href="/" className="flex-column align-center">
            <div className="svg-wrapper">
              <Twitter />
            </div>
            <div className={styles["social-medias__name"]}>Twitter</div>
          </a>
        )}

        <a href="/" className="flex-column align-center">
          <div className="svg-wrapper">
            <Share width="25px" height="25px" />
          </div>
          <div className={styles["social-medias__name"]}>Share</div>
        </a>
      </div>
      <hr className="hr" />
      <div className={styles["webstore__directions"]}>
        <h3 className="category-name">Location Details</h3>
        <div className={styles["webstore__directions-card"]}>
          <ul className={styles["webstore__directions-card--right"]}>
            <li>3.5 km from your Location</li>
            <li>{store.location} </li>
          </ul>
          <div className={styles["webstore__directions-card--left"]}>
            <div className="svg-wrapper">
              <Map />
            </div>
            <div>Map</div>
          </div>
        </div>
      </div>
      <Space />
      <div className={styles["webstore__body"]}>
        <h3 className="category-name">All Makutano Products</h3>
        <div className="flex-row">
          <h3 className={styles["webstore__category"]}>Categories</h3>
          <h3 className={styles["webstore__review-name"]}>Reviews</h3>
        </div>
        <ul className={styles["webstore__categories"]}>
          <li>Electronics</li>
          <li>Phones</li>
          <li>Tablets</li>
        </ul>
        <hr />
        <Products products={store.products} />
        <Space />
        <div className={styles["same-phone-reviews"]}>
          <h3 className="">Store Review</h3>
          <div className={styles["review-wrapper"]}>
            <ViewRating />
            <div className={styles["review-content"]}>
              I love this Device, the display and i'm in love with the camera
            </div>
            <div
              className={
                styles["review-origin"] + "flex-row justify-space-btwn"
              }
            >
              <p>
                <i>Commented from</i> Samsung S9
              </p>
              <i>5 months ago</i>
            </div>
            <button
              className={styles["askQuestion-btn"]}
              onClick={() => setToggleAddReview(true)}
            >
              Add Your Review
            </button>
            {toggleAddReview && (
              <AddStoreReview
                toggleAddStoreReview={setToggleAddReview}
                storeId={store._id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebStore;
