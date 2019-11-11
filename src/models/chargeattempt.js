"use strict";

const uuid = require("uuid");
const crypto = require("crypto");
module.exports = (sequelize, DataTypes) => {
  const ChargeAttempt = sequelize.define(
    "ChargeAttempt",
    {
      uuid: DataTypes.UUID,
      txnref: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
      scheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Schedules",
          key: "id"
        }
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  ChargeAttempt.beforeCreate(chargeAttempt => chargeAttempt.uuid = uuid());
  ChargeAttempt.associate = function(models) {
    ChargeAttempt.belongsTo(models.User, { foreignKey: "userId" });
    ChargeAttempt.belongsTo(models.Schedule, { foreignKey: "scheduleId" });
  };
  return ChargeAttempt;
};
