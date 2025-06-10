const express = require("express");
const router = express.Router();
const postController = require("../Controllers/post.controllers");
const verifyToken = require("../Middleware/verifyToken");

router.post("/create", verifyToken, postController.create);
router.post("/:postId/comment", verifyToken, postController.addComment);
router.put("/:postId/like", verifyToken, postController.toggleLike);

module.exports = router;
