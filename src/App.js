import React, { useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import Checkout from "./Checkout";
import Payment from "./Payment";
import Header from "./Header";
import Orders from "./Orders";
import Login from "./Login";
import Home from "./Home";
import "./App.css";

// * Loading Stripe
const promise = loadStripe(
  "pk_test_51IMQyrJs0lhroPIDMdRL0Ycvyz9OXsRt1y83aF2epRxQcGq2Hzklg4BYcPA8D0fDnKkuXQNnOjF2IZiS4SJ6oMUf00CmxzkNz3"
);

function App() {
  const [{}, dispatch] = useStateValue();

  // * will only run once when the app component loads
  // * Creating a listener to keep track of everyone who signs in
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // * the user just logged in or was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // * the user has logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
