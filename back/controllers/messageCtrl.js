import asyncHnader from "express-async-handler";
import { customError } from "../middlewares/errorHandler.js";
import { messageModel, userModel } from "../models/index.js";
import pagination from "../middlewares/pagination.js";
export const createMessasge = asyncHnader(async (req, res) => {
  const { name, text } = req.body;
  const info = res.userInfo;
  if (!name || !text)
    return res.status(401).send({ message: "تمام فیلد هارو پر کنید" });
  try {
    await messageModel.create({ name, userId: info.id, text });
    res.send({ success: true });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const replyMessage = asyncHnader(async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  const info = res.userInfo;
  try {
    await messageModel.create({ text, replyId: id, userId: info.id });
    const data = await messageModel.findByPk(id);
    data.status = true;
    data.save();
    res.send({ success: true });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const getAllMessasge = asyncHnader(async (req, res) => {
  const info = res.userInfo;
  try {
    const data = await messageModel.findAll({
      where: { userId: info.id },
      order: [["createdAt"]],
      attributes: { exclude: ["userId", "replyId"] },
      include: [
        {
          model: messageModel,
          as: "replies",
          attributes: ["text"],
        },
      ],
    });
    if (!data.length) return res.send({ message: "هنوز تیکتی ثبت نکرده اید" });
    res.send([...data]);
  } catch (err) {
    throw customError(err, 401);
  }
});
export const getMessage = asyncHnader(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await messageModel.findByPk(id, {
      include: [
        {
          model: messageModel,
          as: "replies",
          attributes: ["text"],
          include: [{ model: userModel, attributes: ["name"] }],
        },
      ],
      attributes: { exclude: ["userId", "replyId"] },
    });
    if (!data) return res.status(404).send({ message: "هیچ کامنتی یافت نشد" });
    res.send({ data });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const getAllMessasgeAmin = asyncHnader(async (req, res) => {
  let { status, page } = req.query;
  if (!page) {
    page = 1;
  }
  if (!status) {
    status = false;
  }
  const limit = process.env.LIMIT;
  try {
    const data = await messageModel.findAndCountAll({
      where: { status, replyId: null },
      offset: limit * page - limit,
      limit: limit,
      order: [["createdAt", "DESC"]],
    });
    if (!data.count) {
      return res.send({ message: "پیامی وجود ندارد" });
    }
    const pager = pagination(data.count, limit, page);
    res.send({ ...data, pagination: pager });
  } catch (err) {
    throw customError(err, 500);
  }
});
