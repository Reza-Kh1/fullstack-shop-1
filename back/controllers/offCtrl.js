import { customError } from "../middlewares/errorHandler.js";
import { offModel, userModel } from "../models/index.js";
import asyncHandler from "express-async-handler";

export const createOff = asyncHandler(async (req, res) => {
  const { name, offer, filterCount, start, end, total } = req.body;
  const id = res.userInfo.id;
  try {
    const data = await offModel.create({
      name,
      offer,
      filterCount,
      start,
      end,
      total,
      userId: id,
    });
    res.send({ data });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const deleteOff = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await offModel.destroy({ where: { id } });
    if (!data) throw new Error("تخفیف حذف نشد !!!");
    res.send({ message: "تخفیف با موفقیت حذف شد" });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const updateOff = asyncHandler(async (req, res) => {
  const { name, offer, filterCount, start, end, total } = req.body;
  const { id } = req.params;
  try {
    const data = await offModel.findByPk(id);
    if (!data) throw new Error("تخفیف یافت نشد !!!");
    if (name) {
      data.name = name;
    }
    if (offer) {
      data.offer = offer;
    }
    if (filterCount) {
      data.filterCount = filterCount;
    }
    if (start) {
      data.start = start;
    }
    if (end) {
      data.end = end;
    }
    if (total) {
      data.total = total;
    }
    await data.save();
    res.send({ message: "با موفقیت به روز شد" });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const getOff = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await offModel.findOne({ where: { name: id } });
    if (!data) throw new Error(" کد تخفیف وجود ندارد");
    if (!data?.total) throw new Error("کد تخفیف منقضی شده است");
    const body = {
      name: data.name,
      offer: data.offer,
      filterCount: data.filterCount,
    };
    data.total = data.total - 1;
    data.save();
    res.send({ data: body });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const getAllOff = asyncHandler(async (req, res) => {
  try {
    const data = await offModel.findAll({
      where: {},
      order: [["createdAt", "DESC"]],
      include: [{ model: userModel, attributes: ["name"] }],
      attributes: { exclude: ["userId", "createdAt"] }
    });
    if (!data.length)
      return res.send({ message: "هیچ کد تخفیفی ثبت نکرده اید !" });
    res.send( [...data] );
  } catch (err) {
    throw customError(err, 401);
  }
});
