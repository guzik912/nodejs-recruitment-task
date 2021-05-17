require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = process.env;

const authRoutes = require('./routes/auth');
const moviesRoutes = require('./routes/movies');


const app = express();
connectDB();

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/movies", moviesRoutes);

app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`);
});
