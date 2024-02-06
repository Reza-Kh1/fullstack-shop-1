import { dataBase } from "../config/db.js";
import userModel from "./userModel.js";
import subCategoryModel from "./subCategoryModel.js";
import categoryModel from "./categoryModel.js";
import productModel from "./productModel.js";
import detailProductModel from "./detialModel.js";
import reviewModel from "./reviewModel.js";
import imageModel from "./imageModel.js";
// دسته ها
categoryModel.hasMany(subCategoryModel, {
  foreignKey: "categoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
subCategoryModel.belongsTo(categoryModel, {
  foreignKey: "categoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
})
// محصولات
userModel.hasOne(productModel, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
productModel.belongsTo(userModel, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
subCategoryModel.hasOne(productModel, {
  foreignKey: "categoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
productModel.belongsTo(subCategoryModel, {
  foreignKey: "categoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
productModel.hasOne(detailProductModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
detailProductModel.belongsTo(productModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
// نظرات
productModel.hasOne(reviewModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
reviewModel.belongsTo(productModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
userModel.hasOne(reviewModel, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});
reviewModel.belongsTo(userModel, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});
reviewModel.hasMany(reviewModel, { as: "reply", foreignKey: "replyId" });
// dataBase.sync({ force: true });
dataBase.sync();
export {
  userModel,
  subCategoryModel,
  categoryModel,
  productModel,
  detailProductModel,
  reviewModel, imageModel
};
