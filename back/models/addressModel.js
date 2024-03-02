import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";

const addressModel = dataBase.define(
  "address",
  {
    name: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
    town: {
      type: DataTypes.TEXT,
    },
    postalCode: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false, tableName: "address" }
);
export default addressModel;
