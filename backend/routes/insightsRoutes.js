const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { videoCount } = req.body;

  console.log("Received video count:", videoCount);

  // You can store it in a database, log it, or just return a message
  res.status(200).json({ message: "Video count received", count: videoCount });
});

module.exports = router;
