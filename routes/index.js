const express = require("express");
const { route } = require("./login");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
router.get("/", authenticateToken, (req, res) => {
  return res.send("Hey there");
});
router.use("/login", require("./login"));
router.use("/signup", require("./signup"));

router.get("/", (req, res) => {
  return res.send("hello");
});

module.exports = router;
