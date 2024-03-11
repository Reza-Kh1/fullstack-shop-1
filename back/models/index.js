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
import messageModel from "./MessageModel.js";
import basicCategoryModel from "./basicCategoryModel.js";
import interestModel from "./interestModel.js";
import colorModel from "./ColorModel.js";
// دسته ها
basicCategoryModel.hasMany(categoryModel, {
  foreignKey: "basicCategoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
categoryModel.belongsTo(basicCategoryModel, {
  foreignKey: "basicCategoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
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
userModel.hasMany(productModel, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
productModel.belongsTo(userModel, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
subCategoryModel.hasMany(productModel, {
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
// رنگ ها
productModel.hasMany(colorModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})
colorModel.belongsTo(productModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})
// نظرات
productModel.hasMany(reviewModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
reviewModel.belongsTo(productModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
userModel.hasMany(reviewModel, {
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
addressModel.belongsTo(userModel, {
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
paymentModel.belongsTo(userModel, {
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
// پیام ها
userModel.hasMany(messageModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
messageModel.belongsTo(userModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
messageModel.hasMany(messageModel, { as: "replies", foreignKey: "replyId" });
// علاقه مندی ها
productModel.hasMany(interestModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
interestModel.belongsTo(productModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
userModel.hasMany(interestModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
interestModel.belongsTo(userModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
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
  messageModel,
  basicCategoryModel,
  interestModel,
  colorModel,
};
