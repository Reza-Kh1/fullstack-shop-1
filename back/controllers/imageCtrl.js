import asyncHandler from "express-async-handler";
import { imageModel } from "../models/index.js";
import { customError } from "../middlewares/errorHandler.js";
import pagination from "../middlewares/pagination.js";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const createImage = asyncHandler(async (req, res) => {
  if (req.file == undefined) throw customError("هیچ عکسی انتخاب نشده", 401);
  try {
    const url = req.file.path.replace(/\\/g, "/");
    await imageModel.create({ url });
    const body = {
      success: 1,
      file: {
        url: process.env.URL_SITE + url,
      },
    };
    res.send({ ...body });
  } catch (err) {
    throw customError(err, 400);
  }
});
export const getAllImage = asyncHandler(async (req, res) => {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const limit = process.env.LIMIT;
  try {
    const data = await imageModel.findAndCountAll({
      where: {},
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: page * limit - limit,
    });
    if (!data.count) return res.send({ message: "هیچ عکسی دخیره نشده" });
    const pager = pagination(data.count, limit, page);
    res.send({ ...data, pagination: pager });
  } catch (err) {
    throw customError(err, 400);
  }
});
export const deleteImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const img = await imageModel.findByPk(id);
  if (!img) throw customError("عکس مورد نظر یافت نشد !", 404);
  const nameImg = img.url.replace(process.env.URL_SAVE_IMAGE, "");
  const directory = path.join(
    __dirname,
    `${process.env.URL_IMAGE_WWW}/${nameImg}`
  );
  try {
    if (fs.existsSync(directory)) {
      fs.unlinkSync(directory);
      await img.destroy();
      res.send({ message: "عکس با موفقیت حذف شد" });
    } else {
      throw customError("فایل مورد نظر وجود ندارد");
    }
  } catch (err) {
    throw customError(err, 404);
  }
});
export const getAllFileImage = asyncHandler(async (req, res) => {
  const directory = path.join(__dirname, process.env.URL_IMAGE_WWW);
  fs.readdir(directory, (err, url) => {
    if (err) {
      throw customError("خطایی رخ داده لطفا دوباره تلاش کنید", 400);
    }
    const lenght = url.length;
    if (!lenght) return res.send({ message: "عکسی ذخیره نشده" });
    const data = {
      url,
      count: lenght,
    };
    res.send({ data });
    return;
  });
});
