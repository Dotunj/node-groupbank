"use strict";
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      uuid: {
        type: DataTypes.UUID,
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
      cardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Cards",
          key: "id"
        }
      },
      beneficiaryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Beneficiary",
          key: "id"
        }
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      charge_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN
      }
    },
    {}
  );
  Schedule.associate = function(models) {
    Schedule.belongsTo(models.User, { foreignKey: "userId" });
    Schedule.belongsTo(models.Card, { foreignKey: "cardId" });
    Schedule.belongsTo(models.Beneficiary, { foreignKey: "beneficiaryId" });
  };
  return Schedule;
};
