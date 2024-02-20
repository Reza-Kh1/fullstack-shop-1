import asyncHandler from "express-async-handler";
import { productModel, reviewModel } from "../models/index.js";
import { customError } from "../middlewares/errorHandler.js";
import pagination from "../middlewares/pagination.js";
import token from "jsonwebtoken";
export const createReview = asyncHandler(async (req, res) => {
  let { comment, postId, name, email, phone, replyId } = req.body;
  const { authorization } = req.headers;
  const cookie = req.cookies.user;
  let userId;
  let status;
  if (authorization) {
    const verify = authorization.split(" ")[1];
    const userInfo = token.verify(verify, process.env.TOKEN_SECURET);
    if (userInfo.id && userInfo.phone && userInfo.name) {
      userId = userInfo;
      phone = userInfo?.phone;
      name = userInfo?.name;
      email = userInfo?.email;
    }
  }
  try {
    if (cookie) {
      const userInfo = token.verify(cookie, process.env.TOKEN_SECURET);
      userId = userInfo.id;
      if (userInfo.role === "ADMIN") {
        name = "ادمین " + userInfo.name;
      }
      if (userInfo.role === "AUTHOR") {
        name = "نویسنده " + userInfo.name;
      }
      email = userInfo?.email
      phone = userInfo?.phone
      status = true;
    }
    const data = await reviewModel.create({
      comment,
      postId,
      name,
      email,
      userId,
      phone,
      status,
      replyId,
    });
    res.send({ data });
  } catch (err) {
    throw customError("کامنت ثبت نشد لطفا دوباره وارد حساب شوید", 500);
  }
});
export const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await reviewModel.destroy({ where: { id } });
    if (!data) throw new Error("کامنت حذف نشد");
    res.send({ message: "کامنت حذف شد" });
  } catch (err) {
    throw customError(err, 500);
  }
});
export const updateReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { comment, status } = req.body;
  try {
    const data = await reviewModel.findByPk(id);
    if (!data) throw new Error("کامنت آپدیت نشد !");
    if (status) {
      data.status = status;
    }
    if (comment) {
      data.comment = comment;
    }
    await data.save();
    res.send({ message: "کامنت با موفقیت آپدیت شد" });
  } catch (err) {
    throw customError(err, 500);
  }
});
export const createReplyReview = asyncHandler(async (req, res) => {
  const { comment, postId, name, email, phone, status } = req.body;
  const { id } = req.params;
  const { authorization } = req.headers;
  if (authorization) {
    const verify = authorization.split(" ")[1];
    const userInfo = token.verify(verify, process.env.TOKEN_SEmCURET);
  }
  try {
    const data = await reviewModel.create({
      comment,
      postId,
      name,
      email,
      phone,
      status,
    });
    res.send({ data });
  } catch (err) {
    throw customError(err, 500);
  }
});
export const getAllReviewAdmin = asyncHandler(async (req, res) => {
  let { page, status } = req.query;
  if (!page) {
    page = 1;
  }
  if (!status) {
    status = false;
  }
  const limit = process.env.LIMIT;
  try {
    const data = await reviewModel.findAndCountAll({
      where: { status },
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: page * limit - limit,
      include: [{ model: productModel, attributes: ["name", "slug"] }],
      attributes: {
        exclude: ["postId", "userId"]
      }
    });
    if (!data.count) res.send({ message: "هیچ کامنتی ثبت نشده" });
    const pager = pagination(data.count, limit, page);
    res.send({
      ...data,
      pagination: pager,

    });
  } catch (err) {
    customError(err, 500);
  }
});
export const getAllReview = asyncHandler(async (req, res) => {
  let { page, post } = req.query;
  if (!page) {
    page = 1;
  }
  const limit = process.env.LIMIT;
  try {
    const data = await reviewModel.findAndCountAll({
      where: { postId: post, status: true },
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: page * limit - limit,
      attributes: {
        exclude: ["email", "phone", "status", "userId", "replyId",]
      }
    });
    if (!data.count) return res.send({ message: "هیچ کامنتی وجود ندارد" });
    res.send({ data });
  } catch (err) {
    throw customError(err, 404);
  }
});
export const getReplyReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await reviewModel.findOne({
      where: { id, status: true },
      include: [
        {
          model: reviewModel,
          as: "replies",
          where: { status: true },
          separate: true,
          attributes: ["comment", "name", "replyId", "id", "createdAt"],
          include: [
            {
              where: { status: true },
              separate: true,
              model: reviewModel,
              as: "replies",
              attributes: ["comment", "name", "replyId", "id", "createdAt"],
            },
          ],
        },
      ],
      attributes: { exclude: ["status", "email", "phone"] },
    });
    if (!data) throw customError("هیچ کامنتی یافت نشد", 404);
    res.send({ data });
  } catch (err) {
    throw customError(err, 404);
  }
});
