import asyncHandler from "express-async-handler";
import {
  basicCategoryModel,
  categoryModel,
  subCategoryModel,
} from "../models/index.js";
import { customError } from "../middlewares/errorHandler.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, basicCategoryId } = req.body;
  if (!name || !slug || !basicCategoryId)
    return res.status(401).send({ message: "تمام فلید هارو پر کنید" });
  try {
    await categoryModel.create({ name, slug, basicCategoryId });
    res.send({ message: "دسته با موفقیت افزوده شد" });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await categoryModel.destroy({ where: { id } });
    if (!data) throw new Error("زیر دسته مورد نظر حذف نشد");
    res.send({ message: "با موفقیت حذف شد" });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, slug, basicCategoryId } = req.body;
  try {
    const data = await categoryModel.findByPk(id);
    if (!data) throw new Error("زیر دسته مورد نظر یافت نشد");
    if (name) {
      data.name = name;
    }
    if (slug) {
      data.slug = slug;
    }
    if (basicCategoryId) {
      data.basicCategoryId = basicCategoryId;
    }
    await data.save();
    res.send({ message: "با موفقیت آپدیت شد" });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await categoryModel.findOne({
      where: { slug: id },
      include: [
        {
          model: subCategoryModel,
          attributes: ["name", "slug", "altImg", "srcImg"],
        },
      ],
    });
    if (!data) throw new Error("زیر دسته مورد نظر یافت نشد");
    res.send({ data });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const data = await categoryModel.findAll({
      include: [
        {
          model: subCategoryModel,
          attributes: ["name", "slug", "altImg", "srcImg"],
        },
        {
          model: basicCategoryModel,
          attributes: ["name", "id"],
        },
      ],
      attributes: ["slug", "name", "id"],
    });
    if (!data.length) return res.send({ message: "هیچ دسته ای وجو ندارد" });
    res.send({ data });
  } catch (err) {
    throw customError(err, 401);
  }
});
