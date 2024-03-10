import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";

const colorModel = dataBase.define(
  "colors",
  {
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "colors" }
);
export default colorModel