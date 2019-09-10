const Sequelize = require("sequelize");

const sequelize = new Sequelize("groupbank", "root", "root", {
  host: 'localhost',
  dialect: "mysql",
  dialectOptions: {
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
  }
});

module.exports = sequelize;
