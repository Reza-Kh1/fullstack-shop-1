import asyncHandler from "express-async-handler";
import { customError } from "../middlewares/errorHandler.js";
import { paymentModel } from "../models/index.js";
import pagination from "../middlewares/pagination.js";
export const createPayment = asyncHandler(async (req, res) => {
  const { payment, addres, off, product, status } = req.body;
  //   const user = res.userInfo
  try {
    await paymentModel.create({
      payment,
      addres,
      off,
      product,
      status,
    });
    res.send({ message: "" });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const deletePayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await paymentModel.destroy({ where: { id } });
    if (!data) throw new Error("سفارش حذف نشد");
    res.send({ message: "سفارش با موفقیت حذف شد " });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const updatePayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.query;
  try {
    const data = await paymentModel.findByPk(id);
    if (status) {
      data.status = status;
    }
    res.send({ message: "پرداخت با موفقیت انجام شد" });
  } catch (err) {
    throw customError("پرداخت انجام نشد", 401);
  }
});
export const getPayment = asyncHandler(async (req, res) => {
  const user = res.userInfo;
  const { page } = req.query;
  if (!page) {
    page = 1;
  }
  const limit = process.env.LIMIT;
  try {
    const data = await paymentModel.findAndCountAll({
      where: { userId: user },
      order: [["createdAt", "DESC"]],
      offset: page * limit - limit,
    });
    if (!data) return res.send({ message: "هیچ سفارشی ثبت نشده" });
    const pager = pagination(data.count, limit, page);
    res.send({
      data: {
        data,
        pagination: pager,
      },
    });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const getAllPayment = asyncHandler(async (req, res) => {
  const { status, page } = req.query;
  if (!page) {
    page = 1;
  }
  const limit = process.env.LIMIT;
  try {
    const data = await paymentModel.findAndCountAll({
      where: { status },
      order: [["createdAt", "DESC"]],
      offset: page * limit - limit,
    });
    if (!data) return res.send({ message: "هیچ سفارشی ثبت نشده است" });
    const pager = pagination(data.count, limit, page);
    res.send({
      data: {
        data,
        pagination: pager,
      },
    });
  } catch (err) {
    throw customError(err, 401);
  }
});