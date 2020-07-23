const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, "secertkey");
    req.user = verified;
    next();
  } catch (er) {
    res.status(400).send("Invalid Token");
  }
}

module.exports = auth;
