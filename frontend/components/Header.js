import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { ReactComponent as SearchIcon } from "../public/search.svg";
import { ReactComponent as DropDownIcon } from "../public/down-arrow.svg";
import { ReactComponent as UserIcon } from "../public/user.svg";
import { ReactComponent as HeartIcon } from "../public/heartFull.svg";
import { ReactComponent as BellIcon } from "../public/bell.svg";
import Space from "./Space";
import styles from "./Header.module.css";

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
            <li>Help You window shop From Over 1200 Stores</li>
            <li>
              Alert Your When the Price Drops(<i>for your Favorite Products </i>
              )
            </li>
          </ol>
        </div>
        <div
          className={`${styles["flex-column"]} ${styles["align-center"]} ${styles["dt-header__center"]}`}
        >
          <h3>Search and Compare Products From all Stores</h3>
          <h3>in One Place</h3>
          <input type="search" name="" id="" placeholder="Looking for" />
        </div>
        {user ? (
          <div className={styles["dt-header__right"]}>
            <div className={styles["img-wrapper"]}></div>
            <p className={styles["user-name"]}>Martin Karani</p>
            <p>martinkaraniw@gmail.com</p>
            <p className="flex-row align-center">
              3
              <span>
                <BellIcon width="10px" height="10px" />
              </span>
              Price Alerts
            </p>
            <p className={`${styles["flex-row"]} ${styles["align-center"]}`}>
              2
              <span>
                <HeartIcon width="10px" fill="red" height="10px" />
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
            <div className={`${styles["flex-row"]} ${styles["align-center"]}`}>
              <button className={styles["google-signin"]}>Google</button>{" "}
              <span>or</span>
              <button className={styles["fb-signin"]}>Facebook</button>
            </div>
          </div>
        )}
      </header>
      {/* <Space /> */}
      <h3 className={styles["category-name"]}>Explore</h3>
      <div className={`${styles["flex-row"]} ${styles["dt-explore"]}`}>
        <Link href="/phones" onMouseOver={() => setCurrentHover("phones")}>
          <>
            <div className={styles["img-wrapper"]}></div>
            <p>Phones</p>
            <ul className={styles["dropdown-categories"]}>
              <li>Mobile Phones</li>
              <li>Sim Cards</li>
              <li>Samsung</li>
              <li>Tecno</li>
            </ul>
          </>
        </Link>

        <Link href="/electronics">
          <>
            <div className={styles["img-wrapper"]}></div>
            <p>Electronics</p>
          </>
        </Link>
        <Link href="/fashion">
          <>
            <div className={styles["img-wrapper"]}></div>
            <p>Fashion</p>
          </>
        </Link>
        <Link href="/computing">
          <>
            <div className={styles["img-wrapper"]}></div>
            <p>Computing</p>
          </>
        </Link>
        <Link href="/tablet">
          <>
            <div className={styles["img-wrapper"]}></div>
            <p>Tablet</p>
          </>
        </Link>
        <Link href="/Hardware">
          <>
            <div className={styles["img-wrapper"]}></div>
            <p>HardWares</p>
          </>
        </Link>
        <Link href="/bikes">
          <>
            <div className={styles["img-wrapper"]}></div>
            <p> Bikes</p>
          </>
        </Link>
        <Link href="/furniture">
          <>
            <div className={styles["img-wrapper"]}></div>
            <p>Furniture</p>
          </>
        </Link>
      </div>

      <header className={styles["header"]}>
        <div className={styles["head "]}>
          <div className={styles["logo"]}>
            <h3>SHOPRICE</h3>
            <div className={styles["search-wrapper"]}>
              <input
                type="search"
                name="search"
                id="header__search"
                placeholder="search..."
                autoComplete="off"
                onFocus={() => router.push("/search")}
              />
              <button className={styles["search-btn"]}>
                {/* <SearchIcon style={iconStyles} /> */}
              </button>
            </div>
          </div>
          <div className={styles["header-card"]}></div>
        </div>
      </header>
      {/* <Categories /> */}
    </>
  );
}

export default Header;
