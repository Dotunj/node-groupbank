const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");
const { User } = require("../models");
const { isAuth } = require("../middleware/isAuth");
const cardController = require("../controllers/cardController");
const beneficiaryController = require("../controllers/beneficiaryController");
const scheduleController = require('../controllers/scheduleController');

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

router.get("/cards/all", isAuth, cardController.index);
router.post(
  "/card/create",
  isAuth,
  [body("txnref", "Provide a transaction reference").exists()],
  cardController.create
);
router.delete("/card/delete/:uuid", isAuth, cardController.delete);

router.get("/banks", beneficiaryController.listAllBanks);
router.post(
  "/beneficiary/create",
  isAuth,
  [
    body("recipient_account").exists(),
    body("bank_code").exists(),
    body("card_id").exists()
  ],
  beneficiaryController.create
);
router.get('/beneficiaries', isAuth, beneficiaryController.index)
router.get('/beneficiary/edit/:uuid', isAuth, beneficiaryController.edit);
router.put('/beneficiary/update/:uuid', isAuth, beneficiaryController.update);
router.delete("/beneficiary/delete/:uuid", isAuth, beneficiaryController.delete);

router.get('/schedules/list', isAuth, scheduleController.list);

module.exports = router;
