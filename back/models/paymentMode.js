import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";

const paymentMOdel = dataBase.define(
  "payment",
  {
    payment: {
      type: DataTypes.STRING,
    },
    addres: {
      type: DataTypes.JSONB,
    },
    off: {
      type: DataTypes.STRING,
    },
    product: {
      type: DataTypes.JSONB,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "payment",
    indexes: [{ unique: false, fields: ["status"] }],
  }
);
export default paymentMOdel;
