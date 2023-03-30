require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const { secret } = require("./config.json");
// const jwt = require("./helpers/jwt");

const stripe = require("stripe")(
  "sk_test_51Mcbc4B6T4EqkNJLsFvefKGGELLJZEZlBfVWydcfe3azTYilg61BW0Z9KP5UMhrMc0ZduQIYiZiAbVjhm94urI6p00bdUvPtU0"
); // <-- change the key here

const rooms_routes = require("./routes/rooms");
const users_routes = require("./routes/users");
const bookings_routes = require("./routes/bookings");
const connectDB = require("./db/connection");
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// app.use(cookieParser());

// app.use(jwt());

// app.use(function(req, res, next) {
//   res.header('Content-Type', 'application/json;charset=UTF-8')
//   res.header('Access-Control-Allow-Credentials', true)
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   )
//   next()
// })

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// app.get("/", (req, res) => {
//   res.send("hello");
// });

// console.log(users_routes);

app.use("/api/rooms", rooms_routes);
app.use("/api/users", users_routes);
app.use("/api/bookings", bookings_routes);

app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price * 100,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
