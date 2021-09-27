import React from "react";
import Link from "next/link";
import styles from ".SignUp.module.css";
import { ReactComponent as RightArrow } from "../public/right-arrow-long.svg";

function SignUp({ signUp }) {
  return (
    <div className={styles["signup-container"]}>
      <div className={styles["signup"]}>
        <button className="close" onClick={() => signUp(false)}>
          &times;
        </button>
        <Link href="/signup/member" className={styles["signup-option"]}>
          <button>
            Sign Up as Member
            <span className={styles["signup-arrow"]}>
              <RightArrow />
            </span>
          </button>
          <p>Enables you to add reviews,ask and answer Qustion</p>
        </Link>
        <Link href="/signup/store" className={styles["signup-option"]}>
          <button>
            Sign Up as Store
            <span className={styles["signup-arrow"]}>
              <RightArrow />
            </span>
          </button>
          <p>Enables you Creating/Adding your Store price to shoprice</p>
        </Link>
      </div>
      <div className="overlay" onClick={() => signUp(false)}></div>
    </div>
  );
}

export default SignUp;
