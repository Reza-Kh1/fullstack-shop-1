import { customError } from "../middlewares/errorHandler.js";
import asyncHandler from "express-async-handler";
import cartModel from "../models/cartModel.js";
export const createCart = asyncHandler(async (req, res) => {
  const { total } = req.query;
  const { id } = req.params;
  const user = res.userInfo.id;
  try {
    await cartModel.create({ productId: id, total, userId: user });
    res.send({ message: "محصول با موفقیت افزوده شد" });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const deleteCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await cartModel.destroy({ where: { id } });
    if (!data) throw new Error("محصول از سبد خرید حذف نشد !!!");
    res.send({ message: "محصول از سبد خرید حذف شد" });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const updateCart = asyncHandler(async (req, res) => {
  const { total } = req.query;
  const { id } = req.params;
  if (!total) return;
  try {
    const data = await cartModel.findByPk(id);
    data.total = total;
    res.send({ message: "محصول به روز شد " });
  } catch (err) {
    throw customError(err, 401);
  }
})