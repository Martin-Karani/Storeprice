import React, { useContext } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'

import useForm from "../useForm";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { CREATE_STORE } from "../graphql/Mutations";

function SignStore() {
  const context = useContext(AuthContext);
  // const [errors, setErrors] = useState([]);

  const router = useRouter();
  const { handleChange, handleSubmit, input } = useForm(addStoreCallback, {
    userName: "",
    location: "",
    email: "",
    town: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  const [addStore, { loading }] = useMutation(CREATE_STORE, {
    update(_, { data: { createStore: useData } }) {
      context.login(useData);
      console.log(useData);
      router.push("/stores/webstores/" + useData.storeId);
    },
    onError(err) {
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err);
    },
    variables: { ...input, phoneNo: parseInt(input.phoneNo) },
  });
  //   console.log(input);

  if (loading) return "loading";
  // if (error) return "error";

  function addStoreCallback() {
    addStore();
  }

  return (
    <div className="sign-store">
      <div className="sign-store__message">Create our WebStore</div>
      <div className="login__input">
        <label>Store Name</label>
        <input
          type="text"
          name="userName"
          className="login__email"
          onChange={handleChange}
          value={input.userName}
          placeholder="e.g Tuskys"
        />
      </div>
      <div className="login__input">
        <select value={input.town} onChange={handleChange} name="town">
          <option>Select Your town</option>
          {["Nairobi", "Machakos", "Makueni", "Mombasa"].map((town) => (
            <option value={town}>{town}</option>
          ))}
        </select>
      </div>
      <div className="login__input">
        <label>Location</label>
        <textarea
          name="location"
          cols="30"
          onChange={handleChange}
          value={input.location}
          rows="3"
          placeholder="e.g Kitaot Road along Mititi"
        ></textarea>
      </div>
      <div className="login__input">
        <label>Email</label>
        <input
          type="search"
          name="email"
          onChange={handleChange}
          value={input.email}
          className="login__email"
          placeholder="e.g martih@gmail.com"
        />
      </div>
      <div className="login__input">
        <label>Phone Number</label>
        <input
          type="number"
          name="phoneNo"
          onChange={handleChange}
          value={input.phoneNo}
          className="signup__number"
          placeholder=" e.g 0701855316"
        />
      </div>
      <div className="login__input">
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={input.password}
          className="login__password"
          placeholder="wekr84-20256"
        />
      </div>
      <div className="login__input">
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={input.confirmPassword}
          className="login__password"
          placeholder="wekr84-20256"
        />
      </div>

      <button className="login__btn" onClick={handleSubmit}>
        SignUp
        {/* <span>
          <RightArrow />
        </span> */}
      </button>
      <div className="login__or">or Already have an account ??</div>
      <Link href="/login">
        <button className="login__signUp-btn">Login</button>
      </Link>
      {/* <div className="signUpOutput">
        <div className="signUpOutput__svg">
          <img src="#" alt="" />
        </div>
        <h4 className="signUpOutput__title">Success!</h4>
        <p className="signUpOutput__body">
          Congrats! You have created your Makuti store you can now update you
          store Profile
        </p>
        <button className="signUpOutput__btn">Continue</button>bu
      </div>
      <div></div> */}
    </div>
  );
}

export default SignStore;
