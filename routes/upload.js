const express = require("express");
const multer = require("multer");
const router = express.Router();
const { upload } = require("../controllers/upload");

const storage = multer.diskStorage({
  destination: "./public",
  filename: (req, file, cb) => {
    return cb(null, `image.jpg`);
  },
});

const uploadMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: 10000000,
  },
});

router.post("/upload", uploadMiddleware.single("profile"), upload);

module.exports = router;
