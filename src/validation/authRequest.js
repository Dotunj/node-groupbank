const { body } = require("express-validator");

const registerRequest = () => {
  return [
    body("first_name").exists(),
    body("last_name").exists(),
    body("email").exists()
  ];
};

module.exports = {
  registerRequest
};
