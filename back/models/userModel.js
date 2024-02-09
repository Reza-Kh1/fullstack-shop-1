import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";
import { createHash } from "../utils/createHash.js";
const userModel = dataBase.define(
  "user",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "این شماره تلفن قبلا در سیستم ثبت شده است !",
      },
      validate: {
        is: {
          args: /^(?:[0-9] ?){9,10}[0-9]$/,
          msg: "لطفا شماره تلفن خود را صحیح وارد کنید",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "این ایمیل قبلا در سیستم ثبت شده است !",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // set: async function (value) {
      //   return this.setDataValue("password", await createHash(value));
      // },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["ADMIN", "AUTHOR", "USER"],
      defaultValue: "USER",
    },
  },
  {
    timestamps: true,
    tableName: "user",
    indexes: [
      { unique: true, fields: ["phone", "email"] },
      { unique: false, fields: ["role","name"] },
    ],
  }
);
export default userModel;
