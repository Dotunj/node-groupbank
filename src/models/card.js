"use strict";

const uuid = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define(
    "Card",
    {
      uuid: DataTypes.UUID,
      last_four: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Card.beforeCreate(card => (card.uuid = uuid()));
  Card.associate = function(models) {
    // associations can be defined here
    Card.belongsTo(models.User);
  };
  return Card;
};
