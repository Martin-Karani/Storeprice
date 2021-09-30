import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import useForm from "./hooks/useForm";

import styles from "../styles/Login.module.css";
import { AuthContext } from "./context/auth";
import { LOGIN } from "./graphql/Mutations";
import SignUp from "./SignUp";
import { BackFunction } from "./NavBar";

function Login() {
  const [errors, setErrors] = useState([]);
  const { handleChange, handleSubmit, input } = useForm(addUserCallback, {
    email: "",
    password: "",
    terms: true,
  });

  // const inputRef = useRef(null)

  const [sighUp, setSignUp] = useState(false);
  const [loginedSuccessfully, setloginedSuccessfully] = useState(false);
  const context = useContext(AuthContext);

  const [addUser, { loading: loginLoading }] = useMutation(LOGIN, {
    update(_, { data: { login: userData } }) {
      setloginedSuccessfully(true);
      console.log(userData);
      setTimeout(() => {
        context.login(userData);
      }, 1000);
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },

    variables: input,
  });
  // console.log(input);
  function handleForgetPassword(e) {
    alert("You Click");
  }
  useEffect(() => {
    if (loginedSuccessfully) {
      setTimeout(() => {
        setloginedSuccessfully(false);
      }, 2000);
      return () => {
        clearTimeout();
      };
    }
    return;
    // creating a function in js
  }, [loginedSuccessfully]);
  if (loginLoading) return "loading";

  function addUserCallback() {
    addUser();
    //  history.goBack();
  }
  return (
    <form className={styles["login"]}>
      <div className={styles["back"] + "flex-row"}>
        <BackFunction />
        Back
      </div>
      {loginedSuccessfully && (
        <div className={styles["login-success"]}>Login Successfully</div>
      )}
      <div className={styles["login__welcome"]}>Welcome Back to PriceStore</div>
      {errors.general && (
        <div className={styles["invalid-password"]}>
          OOPS... Invalid Email or Password
        </div>
      )}
      <div
        className={
          errors.email
            ? styles["login__input"] + styles["error"]
            : styles["login__input"]
        }
      >
        <label>Email</label>
        <input
          type="search"
          name="email"
          className={styles["login__email"]}
          value={input.email}
          onChange={handleChange}
          placeholder="martih@gmail.com"
        />
      </div>
      <div className={styles["input-error"]}>{errors.email}</div>
      <div
        className={
          errors.password
            ? styles["login__input"] + styles["error"]
            : styles["login__input"]
        }
      >
        <label>Password</label>
        <input
          type="password"
          name="password"
          id=""
          value={input.password}
          onChange={handleChange}
          className={styles["login__password"]}
          placeholder={
            errors.password ? "Password cannot be empty" : "rquwery9231"
          }
        />
      </div>
      <p className={styles["forget-password"]} onClick={handleForgetPassword}>
        Forget Password
      </p>
      <div className="flex-row">
        <div
          className={styles["login__signUp-btn"]}
          onClick={() => setSignUp(true)}
        >
          SignUp
        </div>
        <button className={styles["login__btn"]} onClick={handleSubmit}>
          Login
        </button>
      </div>
      {sighUp && <SignUp signUp={setSignUp} />}
    </form>
  );
}

export default Login;
