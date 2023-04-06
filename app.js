const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
// read the contents in .env file by using .config()
require("dotenv").config();
app.use(express.json());
app.use(express.static("./public"));

const PORT = 5000;

/* Routing setting */
app.use("/api/v1/tasks", taskRoute);

// connect to DB. When connecting NodeJS and MongoDB, use async process
const start = async () =>{
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, console.log("server is running"));
  } catch (err) {
    console.log(err);
  }
};

start();
