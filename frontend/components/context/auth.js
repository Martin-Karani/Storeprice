import { createContext, useReducer, useState } from "react";
import jwtDecode from "jwt-decode";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";

const initialState = {
  user: null,
  toggleSelected: false,
};
if (typeof localStorage !== "undefined") {
  if (localStorage.getItem("jwtToken")) {
    const decodeToken = jwtDecode(localStorage.getItem("jwtToken"));

    if (decodeToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("jwtToken");
    } else {
      initialState.user = decodeToken;
    }
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function AuthReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "TOGGLE_SELECTED":
      return {
        ...state,
        toggleSelected: !state.toggleSelected,
      };
    default:
      return state;
  }
}
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const login = (userData) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("jwtToken", userData.token);
    }
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const setToggleSelected = () => {
    dispatch({ type: "TOGGLE_SELECTED" });
  };

  const logout = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("jwtToken");
    }
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
        setToggleSelected,
        setSelectedProducts,
        selectedProducts,
        toggleSelected: state.toggleSelected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
