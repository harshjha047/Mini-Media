//npx nodemon server.js
const express = require("express");
const app = express();
const authRoutes = require("./Routes/auth.routes.js");
const postRoutes = require("./Routes/post.routes.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
