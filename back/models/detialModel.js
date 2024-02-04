import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";

const detailProductModel = dataBase.define(
  "detailProduct",
  {
    title: {
      type: DataTypes.STRING,
    },
    keyward: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    skillProduct: {
      type: DataTypes.JSONB,
    },
    text: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: false, tableName: "detailProduct" }
);
export default detailProductModel;
