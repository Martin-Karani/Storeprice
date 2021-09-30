import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "./context/auth";

import SearchIcon from "../public/search.svg";
import UserIcon from "../public/user.svg";
import DropDownIcon from "../public/down-arrow.svg";
import LogoutIcon from "../public/logout.svg";
import HeartIcon from "../public/heart.svg";

import styles from "../styles/NavBar.module.css";
//
function LargeNavBAr() {
  const { user, logout } = useContext(AuthContext);
  const [toggleUser, setToggleUser] = useState(false);

  const handleToggleUser = () => {
    setToggleUser(!toggleUser);
  };

  return (
    <div className={styles["large-nav-bar"]}>
      <h1 className="category-name">SHOPRICE</h1>

      <div className={styles["search-wrapper"]}>
        <input
          type="search"
          placeholder="Search..."
          name="search"
          className={styles["large-search"]}
        />

        <Link href="/searchresults">
          <button className="svg-wrapper">
            <Image
              src={SearchIcon}
              alt=""
              width="20px"
              height="20px"
              className={styles["large-search-icon"]}
            />
          </button>
        </Link>
      </div>

      <div className={styles["nav-name"]}>Stores NearBy</div>
      <div className={styles["nav-name"]}>Recently Visited</div>
      <div className={styles["nav-name"] + "flex-row"}>
        <Image src={HeartIcon} alt="" width="15px" height="15px" />
        Favorites
      </div>
      {user ? (
        <div className="relative">
          <button className={styles["menu-item"]} onClick={handleToggleUser}>
            <div className={styles["profile-img"]}></div>
            <div>
              <p>Hello,{user.userName}</p>
            </div>
          </button>
          {toggleUser && (
            <>
              <div className={styles["userMore"]}>
                <button className="flex-row">
                  <div className="">
                    <Image
                      src={UserIcon}
                      alt=""
                      height="15px"
                      width="15px"
                      // style={{
                      //   marginRight: "0.7em",
                      //   fill: "palevioletred",
                      // }}
                    />
                  </div>
                  View Profile
                </button>
                <button
                  className={styles["menu-item"]}
                  onClick={() => logout()}
                >
                  <div>
                    <Image
                      src={LogoutIcon}
                      alt=""
                      height="15px"
                      width="15px"
                      // style={{
                      //   height: "15px",
                      //   width: "15px",
                      //   fill: "palevioletred",
                      // }}
                    />
                  </div>
                  LogOut
                </button>
              </div>
              <div
                className="overlay-01"
                onClick={() => setToggleUser(false)}
              ></div>
            </>
          )}
        </div>
      ) : (
        <div className={styles["menu-item"]}>
          <div className="login-icon">
            <Image src={UserIcon} alt="" height="20px" width="20px" />
          </div>
          <Link href="/login"> Sign In</Link>
        </div>
      )}
    </div>
  );
}

export default LargeNavBAr;
