const jwt = require("jsonwebtoken");

const { User } = require("../models");

const { throwError } = require("../util/helpers");

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    throwError("Unauthenticated", 401);
  }
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecret");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    throwError("Not authenticated", 401);
  }
  req.userId = decodedToken.userId;
  next();
};

module.exports = {
    isAuth
}
