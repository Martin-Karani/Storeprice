import { useContext, useState } from "react";
import { ReactComponent as SearchIcon } from "../public/search.svg";
import { ReactComponent as Back } from "../public/left-arrow.svg";
// import { ReactComponent as MenuIcon } from "../resources/menu.svg";
import styles from "./NavBar.module.css";
import { useRouter } from "next/router";

import { AuthContext } from "./context/auth";
// import SignUp from "../SignUp";
// import { ReactComponent as UserIcon } from "../resources/user.svg";
// import { ReactComponent as BellIcon } from "../resources/bell.svg";
// import { ReactComponent as StoreIcon } from "../resources/store.svg";
// import { ReactComponent as LogoutIcon } from "../resources/logout.svg";
// import { ReactComponent as RightArrow } from "../resources/right-arrow.svg";
// import { ReactComponent as DownArrow } from "../resources/down-arrow.svg";

export function BackFunction() {
  const router = useRouter();
  return (
    <Back
      style={{ height: "15px", width: "15px", margin: "auto" }}
      onClick={() => router.back()}
    />
  );
}

function NavBar({ name }) {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  // const handleSignUp = () => {
  //   setToggleMenu(false);
  //   setToggleSignUpMenu(true);
  // };

  return (
    <nav className={styles["nav-bar"]}>
      <div className={styles["nav-bar__header"]}>
        <div className={styles["back-icon-wrapper"]}>
          <BackFunction />
        </div>
        <h3 className="category-name">{name}</h3>
        <div className={styles["nav-bar__header-right"]}>
          <div
            className={styles["search-icon-wrapper"]}
            onClick={() => router.push("/search")}
          >
            <SearchIcon
              style={{ height: "17px", width: "17px", margin: "auto" }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
