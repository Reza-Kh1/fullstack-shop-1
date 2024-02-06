import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";
import productModel from "./productModel.js";

const reviewModel = dataBase.define(
  "review",
  {
    comment: { type: DataTypes.STRING, allowNull: false },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: productModel,
        key: "id",
      },
    },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  },
  {
    tableName: "review",
    updatedAt:false,
    createdAt:true,
    indexes: [{ unique: false, fields: ["postId", "replyId"] }],
  }
);
export default reviewModel;
