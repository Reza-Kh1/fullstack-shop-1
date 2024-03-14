import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";

const colorModel = dataBase.define(
  "colors",
  {
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codeColor: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    },
    total: {
      type: DataTypes.INTEGER
    },
    discount: {
      type: DataTypes.INTEGER
    },
    totalPrice: {
      type: DataTypes.INTEGER
    },
    endDiscount: {
      type: DataTypes.DATE
    }
  },
  { timestamps: false, tableName: "colors", indexes: [{ unique: false, fields: ["totalPrice"] }] }
);
export default colorModel