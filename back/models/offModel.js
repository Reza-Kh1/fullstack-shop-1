import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";

const offModel = dataBase.define(
  "off",
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    offer: {
      type: DataTypes.STRING,
    },
    filterCount: {
      type: DataTypes.STRING,
    },
    start: {
      type: DataTypes.DATE,
    },
    end: {
      type: DataTypes.DATE,
    },
    total: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    tableName: "off",
    indexes: [{ unique: true, fields: ["name"] }],
  }
);
export default offModel;
