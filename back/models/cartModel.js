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
    timestamps: true,
    tableName: "cart",
  }
);
export default cartModel;
