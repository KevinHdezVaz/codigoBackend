const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51LQFmiBkGcWWRJWK16sZIZ2JEOg5pi5PiB3ElHcVISE23PJOUiP5x4n9pmDzy04BHuZVRvDHeQ7b4n3hY5CXZDEv001qoqG7A2');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => { 
  return items[0].amount;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "mxn",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
app.get("/",async (req, res) =>{
    res.send("hello world")
})

const PORT = process.env.PORT || 5001;
app.set('port', process.env.PORT)
app.listen(PORT, () => console.log("Node server listening on port PORT!"));
