import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";

const basicCategoryModel = dataBase.define(
  "basicCategory",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "اسلاگ این دسته تکراری است",
      },
    },
  },
  { timestamps: false }
);
export default basicCategoryModel;
