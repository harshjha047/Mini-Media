//npx nodemon server.js
const express = require("express");
const app = express();
const authRoutes = require("./Routes/auth.routes.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);

module.exports = app;


