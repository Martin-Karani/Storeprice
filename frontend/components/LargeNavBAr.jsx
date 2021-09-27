import React, { useContext, useState } from "react";
import  Link  from "next/link";
import { ReactComponent as SearchIcon } from "../public/search.svg";
import { ReactComponent as UserIcon } from "../public/user.svg";
import { ReactComponent as DropDownIcon } from "../public/down-arrow.svg";
import { AuthContext } from "./context/auth";
import { ReactComponent as LogoutIcon } from "../public/logout.svg";
import { ReactComponent as HeartIcon } from "../public/heart.svg";
//
function LargeNavBAr() {
  const { user, logout } = useContext(AuthContext);
  const [toggleUser, setToggleUser] = useState(false);

  const handleToggleUser = () => {
    setToggleUser(!toggleUser);
  };

  return (
    <div className="large-nav-bar flex-row justify-space-btwn">
      <h1 className="category-name">SHOPRICE</h1>

      <div className="search-wrapper">
        <input
          type="search"
          placeholder="Search..."
          name="search"
          className="large-search"
        />

        <Link to="/searchresults">
          <button className="svg-wrapper">
            <SearchIcon
              style={{ height: "20px", width: "20px", fill: "palevioletred" }}
              className="large-search-icon"
            />
          </button>
        </Link>
      </div>

      <div className="nav-name">Stores NearBy</div>
      <div className="nav-name">Recently Visited</div>
      <div className="nav-name flex-row">
        <HeartIcon
          style={{ width: "15px", fill: "palevioletred", height: "15px" }}
        />
        Favorites
      </div>
      {user ? (
        <div className="relative">
          <button
            className="flex-row menu-item align-center"
            onClick={handleToggleUser}
          >
            <div className="profile-img"></div>
            <div>
              <p>Hello,{user.userName}</p>
            </div>
          </button>
          {toggleUser && (
            <>
              <div className="userMore">
                <button className="flex-row">
                  <div className="">
                    <UserIcon
                      style={{
                        height: "15px",
                        width: "15px",
                        marginRight: "0.7em",
                        fill: "palevioletred",
                      }}
                    />
                  </div>
                  View Profile
                </button>
                <button className="flex-row menu-item" onClick={() => logout()}>
                  <div>
                    <LogoutIcon
                      style={{
                        height: "15px",
                        width: "15px",
                        fill: "palevioletred",
                      }}
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
        <div className="flex-row menu-item">
          <div className="login-icon">
            <UserIcon
              style={{ height: "20px", width: "20px", fill: "palevioletred" }}
            />
          </div>
          <Link to="/login"> Sign In</Link>
        </div>
      )}
    </div>
  );
}

export default LargeNavBAr;
