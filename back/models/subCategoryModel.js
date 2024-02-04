import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";

const subCategoryModel = dataBase.define(
  "subCategory",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      unique: {
        args: true,
        msg: "نام این زیر دسته تکراری است",
      },
      type: DataTypes.STRING,
      allowNull: false,
    },
    altImg: {
      type: DataTypes.STRING,
    },
    srcImg: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: "subCategory",
    indexes: [{ unique: true, fields: ["slug"] }],
  }
);
export default subCategoryModel;
