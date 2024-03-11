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
    off: {
      type: DataTypes.INTEGER,
    },
    endOff: {
      type: DataTypes.DATE
    },
    moreInfo: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER
    },
    total: {
      type: DataTypes.BOOLEAN
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
      { unique: false, fields: ["slug", "name", "description", "status", "keycode", "off"] },
    ],
  }
);
export default productModel;
