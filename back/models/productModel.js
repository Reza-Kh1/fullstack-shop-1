import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";
const productModel = dataBase.define(
  "product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    altImg: {
      type: DataTypes.STRING,
    },
    srcImg: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "اسلاگ قبلا ثبت شده است!",
      },
    },
    moreInfo: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    description: {
      type: DataTypes.TEXT,
    },
    keycode: {
      type: DataTypes.STRING,
      defaultValue: () => {
        const key = [...Array(8)]
          .map(() => (~~(Math.random() * 36)).toString(36))
          .join("");
        return key.toUpperCase();
      },
    },
  },
  {
    timestamps: true,
    tableName: "product",
    indexes: [
      { unique: false, fields: ["slug", "name", "description", "status", "keycode"] },
    ],
  }
);
export default productModel;
