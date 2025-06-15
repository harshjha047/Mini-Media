const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/verifyToken")
const authController = require("../Controllers/auth.controllers");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.put("/:id/follow", verifyToken, authController.toggleFollow);

module.exports = router;
