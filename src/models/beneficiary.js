"use strict";

const uuid = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Beneficiary = sequelize.define(
    "Beneficiary",
    {
      uuid: DataTypes.UUID,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
      cardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Cards",
          key: "id"
        }
      },
      account_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bank_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      account_number: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );

  Beneficiary.beforeCreate(beneficiary => (beneficiary.uuid = uuid()));
  Beneficiary.associate = function(models) {
    // associations can be defined here
    Beneficiary.belongsTo(models.User);
    Beneficiary.belongsTo(models.Card);
  };
  return Beneficiary;
};
