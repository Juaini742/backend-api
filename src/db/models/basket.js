"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Basket.belongsTo(models.User_details, {
        foreignKey: "user_id",
      });
      Basket.hasMany(models.Products, {
        foreignKey: "id",
      });
    }
  }
  Basket.init(
    {
      user_id: DataTypes.STRING,
      token: DataTypes.STRING,
      product_id: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Baskets",
    }
  );
  return Basket;
};
