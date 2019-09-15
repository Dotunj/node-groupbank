const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");
const { User } = require("../models");
const { isAuth } = require("../middleware/isAuth");
const cardController = require("../controllers/cardController");

router.post(
  "/register",
  [
    body("first_name", "Please enter a first name").exists(),
    body("last_name", "Please enter a last name").exists(),
    body("password", "Please enter a password").exists(),
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ where: { email: value } }).then(userEmail => {
          if (userEmail) {
            return Promise.reject("Email already exists");
          }
        });
      })
      .normalizeEmail()
  ],
  authController.register
);

router.post(
  "/login",
  [body("email").exists(), body("password").exists()],
  authController.login
);

router.post(
  "/card/create",
  isAuth,
  [body("txnref", "Provide a transaction reference").exists()],
  cardController.create
);
router.delete("/card/delete/:uuid", isAuth, cardController.delete);

module.exports = router;
