const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'logicbees_secret_key_is_longer_by_sangi');
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed! i am check auth" });
  }
};
