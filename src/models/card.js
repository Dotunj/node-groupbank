"use strict";

const uuid = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define(
    "Card",
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
      last_four: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      expiry_month: {
        type: DataTypes.STRING,
        allowNull: false
      },
      expiry_year: {
        type: DataTypes.STRING,
        allowNull: false
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Card.beforeCreate(card => (card.uuid = uuid()));
  Card.associate = function(models) {
    // associations can be defined here
    Card.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Card;
};
