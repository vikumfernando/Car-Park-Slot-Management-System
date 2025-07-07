//importing packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./scheduler");

const app = express();
require("dotenv").config();


//assigning port number
const PORT = process.env.PORT || 8070;

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: false               
}));

app.use(bodyParser.json());

//getting the URL from .env file
const URL = process.env.MONGODB_URL;

//opening connection with MongoDB
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

//Assigning the student path to the studentRouter

const userRouter = require("./routes/Users.js");
const vehicelRouter = require("./routes/Vehicles.js");
app.use("/Vehicles", vehicelRouter);
app.use("/Users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
