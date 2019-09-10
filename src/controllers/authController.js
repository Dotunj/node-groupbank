const { validationResult } = require("express-validator/check");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { throwError, sendError } = require("../util/helpers");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let { first_name, last_name, email } = req.body;
    let password = await bcrypt.hash(req.body.password, 12);
    let user = await User.create({ first_name, last_name, email, password });
    res.status(201).json({ user });
  } catch (err) {
    sendError(err, next);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Validation failed",
        errors: errors.array()
      });
    }
    let { email, password } = req.body;
    let user = await User.findOne({ where: { email } });
    if (!user) throwError("An account with that email could not be found", 404);
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) throwError("Invalid Password", 401);
    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id.toString()
      },
      "somesupersecret",
      {
        expiresIn: "5h"
      }
    );
    res.json({ token, userId: user.uuid.toString() });
  } catch (err) {
    sendError(err, next);
  }
};

exports.home = async (req, res, next) => {};
