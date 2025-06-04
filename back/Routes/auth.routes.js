const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth.controllers");

router.post("/register", authController.register);
router.get("/login", authController.login);
router.post("/logout", authController.logout);


module.exports = router;
