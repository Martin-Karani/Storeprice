import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/SignUp.module.css";
import RightArrow from "../public/right-arrow-long.svg";

function SignUp({ signUp }) {
  return (
    <div className={styles["signup-container"]}>
      <div className={styles["signup"]}>
        <button className="close" onClick={() => signUp(false)}>
          &times;
        </button>
        <Link href="/signup/member">
          <div className={styles["signup-option"]}>
            <button>
              Sign Up as Member
              <span className={styles["signup-arrow"]}>
                <Image src={RightArrow} alt="" height="20px" width="20px" />
              </span>
            </button>
            <p>Enables you to add reviews,ask and answer Qustion</p>
          </div>
        </Link>
        <Link href="/signup/store">
          <div className={styles["signup-option"]}>
            <button>
              Sign Up as Store
              <span className={styles["signup-arrow"]}>
                <Image src={RightArrow} alt="" height="20px" width="20px" />
              </span>
            </button>
            <p>Enables you Creating/Adding your Store price to shoprice</p>
          </div>
        </Link>
      </div>
      <div className="overlay" onClick={() => signUp(false)}></div>
    </div>
  );
}

export default SignUp;
