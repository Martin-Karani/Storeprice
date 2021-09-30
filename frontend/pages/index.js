import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { useState, useEffect } from "react";
import ProductCardContainer from "../components/ProductCardContainer";
import Space from "../components/common/Space";
import locationIcon from "../public/location-icon.png";
// import { ScrollToTop } from "../utils";
import Header from "../components/Header";
// import useGeolocation from "../useGeolocation";
import BottomNav from "../components/BottomNav";

function Home() {
  const [isAllowLocationVisible, setIsAllowLocationVisible] = useState(false);
  // ScrollToTop();
  // useEffect(() => {
  //   setTimeout(() => setIsAllowLocationVisible(true), 4000);

  //   return () => clearTimeout();
  // }, []);
  // const location = useGeolocation();

  return (
    <div className="App">
      <div className="App-header">
        {/* <CompareProductCard /> */}
        <BottomNav />
        <Header />
        <Space />
        <ProductCardContainer />
        <Space />
        {isAllowLocationVisible && (
          <div className="location-active">
            <div className="allow-location">
              <button
                className="close"
                onClick={() => setIsAllowLocationVisible(false)}
              >
                &times;
              </button>
              <h3 className="allow-location__title">
                Allow us to access Your Location
              </h3>
              <div className="img-wrapper">
                <Image src={locationIcon} alt="" />
              </div>
              <p className="allow-location__detail">
                We need you location to provide you with the nearest stores to
                you.Your location is safe with us
              </p>
              <button
                className="allow-location__button"
                onClick={() => setIsAllowLocationVisible(false)}
              >
                Allow Location
              </button>
            </div>
            <div
              className="overlay"
              onClick={() => setIsAllowLocationVisible(false)}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
