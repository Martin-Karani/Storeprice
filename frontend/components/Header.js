import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import SearchIcon from "../public/search.svg";
import DropDownIcon from "../public/down-arrow.svg";
import UserIcon from "../public/user.svg";
import HeartIcon from "../public/heartFull.svg";
import BellIcon from "../public/bell.svg";
import Space from "./Space";
import styles from "../styles/Header.module.css";

import Categories from "./Categories";
import { AuthContext } from "./context/auth";

function Header() {
  const iconStyles = {
    marginTop: "3px",
    width: "15px",
    height: "auto",
  };
  const { user, logout } = useContext(AuthContext);
  const [currentHover, setCurrentHover] = useState("");
  const router = useRouter();
  let width;
  useEffect(() => {
    width = window.innerWidth;
  }, []);
  return (
    <>
      <div className={styles["dt-head"]}>
        <header className={styles["dt-header"]}>
          <div className={styles["dt-header__left"]}>
            <h2 className={styles["logo"]}>SHOPRICE</h2>
            <h3 className={styles["category-name"]}>What We Do!!</h3>
            <ol>
              <li>
                Help Save some money By Figuring out for you best offers and
                discounts available(<i>From Over 200 Stores</i>)
              </li>
              <li>
                Save Your Time(<i>used when browsing for best price </i>) by
                bringing all the prices together
              </li>
              {/* <li>Help You window shop From Over 1200 Stores</li> */}
              {/* <li>
              Alert Your When the Price Drops(<i>for your Favorite Products </i>
              )
            </li> */}
            </ol>
          </div>
          <div
            className={`flex-column align-center ${styles["dt-header__center"]}`}
          >
            <h3>Search and Compare Products From all Stores</h3>
            <h3>in One Place</h3>
            <input type="search" name="" id="" placeholder="Looking for" />
          </div>
          {user ? (
            <div className={styles["dt-header__right"]}>
              <div className="img-wrapper"></div>
              <p className={styles["user-name"]}>Martin Karani</p>
              <p>martinkaraniw@gmail.com</p>
              <p className="flex-row align-center">
                3
                <span>
                  <Image src={BellIcon} alt="" height="10px" width="10px" />
                </span>
                Price Alerts
              </p>
              <p className="flex-row align-center">
                2
                <span>
                  <Image src={SearchIcon} alt="" height="10px" width="10px" />
                </span>
                Favorites
              </p>
              <button className={styles["dt-logout"]} onClick={() => logout()}>
                Log Out
              </button>
            </div>
          ) : (
            <div className={styles["dt-header__right"]}>
              <Link href="/login" className={styles["primary-btn"]}>
                Login / Sign UP
              </Link>
              <i>Or sign in with</i>
              <div className="flex-row align-center">
                <button className={styles["google-signin"]}>Google</button>{" "}
                <span>or</span>
                <button className={styles["fb-signin"]}>Facebook</button>
              </div>
            </div>
          )}
        </header>
        <Space />
        <h3 className="category-name">Explore</h3>
        <div className={styles["dt-explore"]}>
          <Link
            href="/products/phones"
            onMouseOver={() => setCurrentHover("phones")}
          >
            <div>
              <div className={styles["img-wrapper"]}></div>
              <p>Phones</p>
              <ul className={styles["dropdown-categories"]}>
                <li>Mobile Phones</li>
                <li>Sim Cards</li>
                <li>Samsung</li>
                <li>Tecno</li>
              </ul>
            </div>
          </Link>

          <Link href="/products/electronics">
            <div>
              <div className={styles["img-wrapper"]}></div>
              <p>Electronics</p>
            </div>
          </Link>
          <Link href="/products/fashion">
            <div>
              <div className={styles["img-wrapper"]}></div>
              <p>Fashion</p>
            </div>
          </Link>
          <Link href="/products/computing">
            <div>
              <div className={styles["img-wrapper"]}></div>
              <p>Computing</p>
            </div>
          </Link>
          <Link href="/products/tablet">
            <div>
              <div className={styles["img-wrapper"]}></div>
              <p>Tablet</p>
            </div>
          </Link>
          <Link href="/products/Hardware">
            <div>
              <div className={styles["img-wrapper"]}></div>
              <p>HardWares</p>
            </div>
          </Link>
          <Link href="/products/bikes">
            <div>
              <div className={styles["img-wrapper"]}></div>
              <p> Bikes</p>
            </div>
          </Link>
          <Link href="/products/furniture">
            <div>
              <div className={styles["img-wrapper"]}></div>
              <p>Furniture</p>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles["sm-header"]}>
        <header className={styles["header"]}>
          <div className={styles["head "]}>
            <div className={styles["logo"]}>
              <h3>SHOPRICE</h3>
              <div className={styles["search-wrapper"]}>
                <input
                  type="search"
                  name="search"
                  id={styles["header__search"]}
                  placeholder="search..."
                  autoComplete="off"
                  onFocus={() => router.push("/search")}
                />
                <button className={styles["search-btn"]}>
                  <Image src={SearchIcon} alt="" height="15px" width="15px" />
                </button>
              </div>
            </div>
            <div className={styles["header-card"]}></div>
          </div>
        </header>
        <Categories />
      </div>
    </>
  );
}

export default Header;
