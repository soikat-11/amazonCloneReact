import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

import "./Login.css";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // * Signing In
  const signInHandler = (e) => {
    // * to prevent the page from refreshing
    e.preventDefault();

    // * some fancy firebase login shittttttt.....
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  // * Creating an Amazon acc
  const registerHandler = (e) => {
    // * to prevent the page from refreshing
    e.preventDefault();

    // * some fancy firebase register shittttttt.....
    // * if authentication successful, it returns an auth object
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // * successfully created new user
        // * with email and password
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG6.png"
          alt=""
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type={"submit"}
            onClick={signInHandler}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>

        <p>
          By signing in you agree to AMAZON-CLONE's Terms & Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          type={"submit"}
          onClick={registerHandler}
          className="login__registerButton"
        >
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
