import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";
const cartModel = dataBase.define(
  "cart",
  {
    total: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    tableName: "cart",
  }
);
export default cartModel;
