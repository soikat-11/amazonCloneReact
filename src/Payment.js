import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { db } from "./firebase";
import axios from "./axios";
import "./Payment.css";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  // * Stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  // * here we need a few pieces of state
  const [succeeded, setSucceeded] = useState(false); // * to handle various stages of card transaction
  const [processing, setProcessing] = useState(""); // * to handle various stages of card transaction
  const [error, setError] = useState(null); // * error state - to capture any kind of card errors
  const [disabled, setDisabled] = useState(true); // * disable state - to disable the button
  const [clientSecret, setClientSecret] = useState(true); // * to handle various stages of card transaction

  // * generate the special stripe secret which allows us to charge a customer
  // * whenever the basket changes we need to get a new secret
  // ! VERY IMPORTANT CODE SNIPPET
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // * stripe expects the total in a currencies sub-units
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      // ! where the hell is this coming from
      setClientSecret(response.data.clientSecret); // * will make sense once we build the backend
    };
    getClientSecret();
  }, [basket]);

  console.log("THE SECRET IS >>>", clientSecret);

  // * do all the fancy stripe stuff
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true); // * with this you can only click the [Buy Now] button once

    // * this helps stripe figure out how much amount to charge
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // * paymentIntent = payment confirmation
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        // * now here, we don't want people to come back to the payment page
        // * otherwise stuck in infinite loop, result in bad user experience
        // * so we're using .replace instead of .push
        history.replace("/orders");
      });
  };

  // * Listen for changes in the CardElement
  // * Display any errors as the user types their card details
  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Delivery Address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>

          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>New Delhi, India</p>
          </div>
        </div>

        {/*Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>

          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/*Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment__details">
            {/* Stripe Magic will go here */}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />

                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Error Handling During Card Transactions */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
