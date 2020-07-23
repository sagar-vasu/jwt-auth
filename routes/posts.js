const express = require("express");
const router = express.Router();
const verify = require("../middelwares/verifyToken");

router.get("/", verify, (req, res) => {
  res.send({
    posts: {
      title: "my first pet",
      description: "random data you shoud not access",
    },
  });
});

module.exports = router;
