import asyncHandler from "express-async-handler";
import { categoryModel, subCategoryModel } from "../models/index.js";
import { customError } from "../middlewares/errorHandler.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name, slug } = req.body;
  try {
    await categoryModel.create({ name, slug });
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
  const { name, slug } = req.body;
  try {
    const data = await categoryModel.findByPk(id);
    if (!data) throw new Error("زیر دسته مورد نظر یافت نشد");
    if (name) {
      data.name = name;
    }
    if (slug) {
      data.slug = slug;
    }
    data.save();
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
      include: [{ model: subCategoryModel, attributes: ["name", "slug"] }],
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
      ],
      attributes: ["slug", "name", "id"],
    });
    if (!data.length) return res.send({ message: "هیچ دسته ای وجو ندارد" });
    res.send({ data });
  } catch (err) {
    throw customError(err, 401);
  }
});
