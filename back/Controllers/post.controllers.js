const User = require("../Models/User")
const Post = require("../Models/Post")
const upload = require("../Middleware/upload")




exports.create = [
  upload.single("file"), // Make sure you're using the single uploader
  async (req, res) => {
    try {
      const { caption } = req.body;

      if (!caption) {
        return res.status(400).json({ success: false, message: "Caption is required." });
      }

      const user = await User.findOne({ email: req.user.email }); // req.user should be decoded from JWT

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      const newPost = new Post({
        caption: caption,
        image: req.file ? req.file.filename : "", // if image is uploaded
        createdBy: user._id,
      });

      await newPost.save();

      return res.status(201).json({
        success: true,
        message: "Post created successfully.",
        post: newPost,
      });

    } catch (error) {
      console.error("Create Post Error:", error.message);
      return res.status(500).json({ success: false, message: "Server error while creating post." });
    }
  }
];



  // exports.create = [
  //   upload.array("file"),
  //   async(req, res) => {
  //     try {
  //     let user = await userModel.findOne({ email: req.user.email });



  //       console.log("Body:", req.body);
  //       console.log("File:", req.files);
  
  //       res.status(200).json({
  //         message: "File uploaded successfully",
  //         file: req.files.filename,
  //       });
  //     } catch (err) {
  //       console.error(err);
  //       res.status(500).json({ message: "Internal Server Error" });
  //     }
  //   }
  // ];
