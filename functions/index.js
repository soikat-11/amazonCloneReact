// * building an express app and hosting it on a cloud function
// * this will be my full back-end on a cloud function

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

// * putting the secret key here
const stripe = require("stripe")(
  "sk_test_51IMQyrJs0lhroPIDOt6f2DsnYUXBNMx89Wt0uXlQHDphkM1mvxXMBh8t9ELObHHNnH6WWegEi2s1Bp72KCFzQU0I00VgPaAYxi"
);

// * API

// * App config
const app = express();

// * Middlewares
app.use(cors({ origin: true }));
app.use(express.json()); //  * to pass data in json format

// * API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Received for ➡️ amount ", total);

  const paymentIntent = await stripe.paymentIntent.create({
    amount: total, // sub-units of the currency
    currency: "usd",
  });

  // * OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// * Listen commands
exports.api = functions.https.onRequest(app);

// * Example endpoint
// http://localhost:5001/challenge-deb12/us-central1/api
