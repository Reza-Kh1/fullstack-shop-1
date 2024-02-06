import { dataBase } from "../config/db.js";
import userModel from "./userModel.js";
import subCategoryModel from "./subCategoryModel.js";
import categoryModel from "./categoryModel.js";
import productModel from "./productModel.js";
import detailProductModel from "./detialModel.js";
import reviewModel from "./reviewModel.js";
import cartModel from "./cartModel.js";
import paymentModel from "./paymentMode.js";
import offModel from "./offModel.js";
import addressModel from "./addressModel.js";
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
});
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
reviewModel.hasMany(reviewModel, { as: "replies", foreignKey: "replyId" });
// پرداخت
userModel.hasMany(addressModel, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});
addressModel.hasMany(userModel, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});
productModel.hasMany(cartModel, {
  foreignKey: "productId",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});
cartModel.belongsTo(productModel, {
  foreignKey: "productId",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});
userModel.hasMany(cartModel, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});
cartModel.belongsTo(userModel, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});
userModel.hasMany(paymentModel, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});
paymentModel.hasMany(userModel, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});
// تخفیف ها
userModel.hasMany(offModel, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
offModel.belongsTo(userModel, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
// dataBase.sync({ force: true });
dataBase.sync();
export {
  userModel,
  subCategoryModel,
  categoryModel,
  productModel,
  detailProductModel,
  cartModel,
  paymentModel,
  offModel,
  addressModel,
  reviewModel,
  imageModel,
};
