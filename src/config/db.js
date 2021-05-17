const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

const connectDB = () => {
  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log(`MongoDB connected!`))
    .catch((err) => console.log(err));
};


module.exports = connectDB;