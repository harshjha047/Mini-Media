const User = require("../Models/User");
const Post = require("../Models/Post");
const upload = require("../Middleware/upload");

exports.create = [
  upload.single("file"),
  async (req, res) => {
    try {
      const { caption } = req.body;

      if (!caption) {
        return res
          .status(400)
          .json({ success: false, message: "Caption is required." });
      }

      const user = await User.findOne({ email: req.user.email });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found." });
      }

      const newPost = await Post.create({
        caption: caption,
        image: req.file ? req.file.filename : "",
        createdBy: user._id,
      });
      user.posts.push(newPost._id);
      await user.save();

      return res.status(201).json({
        success: true,
        message: "Post created successfully.",
        post: newPost,
      });
    } catch (error) {
      console.error("Create Post Error:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Server error while creating post." });
    }
  },
];

exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ success: false, message: "Comment text is required." });
    }

    const user = await User.findOne({ email: req.user.email }); // req.user is from JWT middleware
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }

    post.comments.push({
      user: user._id,
      text,
    });

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Comment added successfully.",
      comments: post.comments,
    });
  } catch (err) {
    console.error("Add Comment Error:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add comment." });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const user = await User.findOne({ email: req.user.email }); // from verifyToken middleware

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const hasLiked = post.likes.includes(user._id);

    if (hasLiked) {
      // Unlike the post
      post.likes = post.likes.filter(
        (userId) => userId.toString() !== user._id.toString()
      );
    } else {
      // Like the post
      post.likes.push(user._id);
    }

    await post.save();

    return res.status(200).json({
      success: true,
      liked: !hasLiked,
      likeCount: post.likes.length,
      message: hasLiked ? "Post unliked" : "Post liked"
    });
  } catch (error) {
    console.error("Toggle Like Error:", error.message);
    return res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

