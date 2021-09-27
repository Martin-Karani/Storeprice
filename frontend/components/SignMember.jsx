import React, { useContext, useEffect, useState } from "react";
import  Link  from "next/link";
import useForm from "./hooks/useForm";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { CREATE_MEMBER } from "../graphql/Mutations";
import { BackFunction } from "./NavBar";

function SignMember() {
  const [errors, setErrors] = useState([]);
  const context = useContext(AuthContext);
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);
  const { handleChange, handleSubmit, input } = useForm(addMemberCallback, {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addMember, { loading }] = useMutation(CREATE_MEMBER, {
    update(_, { data: { createMember: userData } }) {
      setCreatedSuccessfully(true);
      setTimeout(() => {
        context.login(userData);
      }, 3000);
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: input,
  });

  useEffect(() => {
    if (createdSuccessfully) {
      setTimeout(() => {
        setCreatedSuccessfully(false);
      }, 2000);
      return () => {
        clearTimeout();
      };
    }
    return;
  }, [createdSuccessfully]);
  if (loading) return "Loading";

  function addMemberCallback() {
    addMember();
  }

  return (
    <div className="sign-member">
      <div className="back flex-row">
        <BackFunction />
        Back
      </div>
      <div className="sign-welcome">Welcome to PriceStore</div>
      {createdSuccessfully && (
        <div className="login-success">Created Successfully</div>
      )}
      <div className={errors.userName ? "login__input error" : "login__input"}>
        <label>UserName</label>
        {errors.userName && (
          <span className="input-error">{errors.userName}</span>
        )}
        <input
          type="search"
          name="userName"
          onChange={handleChange}
          value={input.userName}
          className="login__email"
          placeholder="martoh karash"
        />
      </div>

      <div className={errors.email ? "login__input error" : "login__input"}>
        <label>Email</label>

        {errors.email && <span className="input-error">{errors.email}</span>}
        <input
          type="search"
          name="email"
          onChange={handleChange}
          value={input.email}
          className="login__email"
          placeholder="martih@gmail.com"
        />
      </div>

      <div
        className={
          errors.password || errors.confirmPassword
            ? "login__input error"
            : "login__input"
        }
      >
        <label>Password</label>
        {(errors.password || errors.confirmPassword) && (
          <span className="input-error">
            {errors.password || errors.confirmPassword}
          </span>
        )}
        <input
          type="password"
          name="password"
          id=""
          onChange={handleChange}
          value={input.password}
          className="login__password"
          placeholder="wekr84-20256"
        />
      </div>
      <div
        className={
          errors.password || errors.confirmPassword
            ? "login__input error"
            : "login__input"
        }
      >
        <label>Confirm Password</label>
        {(errors.password || errors.confirmPassword) && (
          <span className="input-error">
            {errors.password || errors.confirmPassword}
          </span>
        )}
        <input
          type="password"
          name="confirmPassword"
          id=""
          value={input.confirmPassword}
          onChange={handleChange}
          className="login__password"
          placeholder="wekr84-20256"
        />
      </div>

      <div className="flex-row">
        <input
          type="checkbox"
          name="terms"
          value={input.terms}
          onChange={handleChange}
        />
        <label style={{ margin: "auto" }}>
          By Signing in, I agree to Terms Conditions
        </label>
      </div>
      <button className="login__btn" onClick={handleSubmit}>
        Sign Up
      </button>
      <div className="login__or">or Already have an account</div>
      <Link to="/login">
        <button className="login__signUp-btn">Login</button>
      </Link>
    </div>
  );
}

export default SignMember;
