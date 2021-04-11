import React, { useContext } from "react";

import "./login.css";
import { useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "./LoginManager";

initializeLoginFramework();

function Login() {
  // use context api from app.js////////////////////
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  // to redirect to shipment page after authentication//
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // for new user registration//
  const [newUser, setNewUser] = useState(false);
  // default //
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });

  //google sign in handler by import//
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };
  //google sign out handler by import//
  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };
  /////////////////////////////////////////

  // form submission functions/////
  const handleBlur = (event) => {
    let isFormValid = true;
    //email validation//
    if (event.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    //password validation//
    if (event.target.name === "password") {
      // 1 uppercase, 1 lowercase, 1 sp char and min 6 chars total//
      isFormValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(
        event.target.value
      );
    }
    //     // update state from form field//
    if (isFormValid) {
      const newUserInfo = { ...user }; // copy all the states from user obj..see up//
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  //   //////////////////////////////////////////
  //authenticate with firebase//
  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }
    // if not new user, then sign in using only email and password//
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    event.preventDefault();
  };

  // function for handling response //
  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res); // from context api//
    if (redirect) {
      history.replace(from); // to replace the location after sign in//
    }
  };
  /////////////////////////////////////////////

  return (
    <div className="login-container">
      {user.isLoggedIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign in</button>
      )}
      {user.isLoggedIn && (
        <div>
          <h3>Welcome! {user.name}</h3>
          <p>Your e-mail : {user.email}</p>
          <img
            style={{ width: "20%", height: "20%" }}
            src={user.photo}
            alt=""
          />
        </div>
      )}

      {/* form section */}
      <h3>Authentication System</h3>
      {/* toggle for registration fields */}
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">Register Now</label>
      <form onSubmit={handleSubmit}>
        {/* name field appears only for new users! */}
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            placeholder="Your Name Here"
          />
        )}
        <br />
        <input
          type="email"
          name="email"
          onBlur={handleBlur}
          placeholder="Your Email here"
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Password"
        />
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
      </form>

      {/* for showing error */}
      <p style={{ color: "red" }}>{user.error}</p>

      {/* for creating user successfully */}
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged in"} successfully!!
        </p>
      )}
    </div>
  );
}

export default Login;
