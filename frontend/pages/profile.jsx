import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "../components/context/auth";

import NavBar from "../components/NavBar";
import Products from "../components/Products";
import SignUp from "../components/SignUp";

import styles from "../styles/Profile.module.css";
import classes from "../styles/Login.module.css";

function Profile() {
  const [currectlyVisible, setCurrectlyVisible] = useState("recently");
  const [sighUp, setSignUp] = useState(false);

  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <NavBar name="MY PROFILE" />
      {sighUp && <SignUp signUp={setSignUp} />}

      <div className={styles["profile-page"]}>
        <div className={styles["profile-details"]}>
          {user ? (
            <div>
              <div className="img-wrapper">
                <Image src="#" alt="" />
              </div>
              <h1>Martin Karani</h1>
              <p>martinkaranie@gmail.com</p>
              <button onClick={() => logout()}>Log Out</button>
            </div>
          ) : (
            <div className="flex-row align-center">
              <Link href="/login">
                <div className={classes["login__btn"]}>Login</div>
              </Link>
              <p>or</p>
              <button
                onClick={() => setSignUp(true)}
                className={classes["login__signUp-btn"]}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
        <ul className={"flex-row " + styles["profile-nav"]}>
          <li onClick={() => setCurrectlyVisible("recently")}>
            Recently Viewed
          </li>

          <li
            onClick={() => setCurrectlyVisible("favorite")}
            className={currectlyVisible === "favorite" && "active"}
          >
            Favorites
          </li>
          <li
            onClick={() => setCurrectlyVisible("q&a")}
            className={currectlyVisible === "q&a" && "active"}
          >
            My Questions
          </li>
          {/* <li onClick={()=>setCurrectlyVisible("favorite")}>My Answers</li> */}
        </ul>

        {currectlyVisible === "q&a" && (
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
        )}

        {currectlyVisible === "recently" && (
          <ul className={styles["recently-visited"]}>
            <Products />
            {/* {[...Array(4)].map(() => (
              <li className="flex-row align-center">
                <div className="my-products-img-wrapper">
                  <Image src="#" alt="" />
                </div>
                <p className="my-products-name">Samsung S9+</p>
              </li>
            ))} */}
          </ul>
        )}
        {currectlyVisible === "favourite" && (
          <ul className={styles["recently-visited"]}>
            {[...Array(3)].map(() => (
              <li className="flex-row align-center">
                <div className={styles["my-products-img-wrapper"]}>
                  <Image src="#" alt="" />
                </div>
                <p className={styles["my-products-name"]}>Samsung S9+</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Profile;
