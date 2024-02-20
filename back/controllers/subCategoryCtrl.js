import asyncHandler from "express-async-handler";
import {
  categoryModel,
  productModel,
  subCategoryModel,
} from "../models/index.js";
import { customError } from "../middlewares/errorHandler.js";
export const createSubCategory = asyncHandler(async (req, res) => {
  const { name, slug, altImg, srcImg, categoryId } = req.body;
  try {
    await subCategoryModel.create({ name, slug, altImg, srcImg, categoryId });
    res.send({ message: "دسته با موفقیت افزوده شد" });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const deleteSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await subCategoryModel.destroy({ where: { id } });
    if (!data) throw new Error("زیر دسته مورد نظر حذف نشد");
    res.send({ message: "با موفقیت حذف شد" });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const updateSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, slug, altImg, srcImg, categoryId } = req.body;
  try {
    const data = await subCategoryModel.findByPk(id);
    if (!data) throw new Error("زیر دسته مورد نظر یافت نشد");
    if (name) {
      data.name = name;
    }
    if (slug) {
      data.slug = slug;
    }
    if (altImg) {
      data.altImg = altImg;
    }
    if (srcImg) {
      data.srcImg = srcImg;
    }
    if (categoryId) {
      data.categoryId = categoryId;
    }
    data.save();
    res.send({ message: "با موفقیت آپدیت شد" });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const getSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await subCategoryModel.findOne({
      where: { slug: id },
      attributes: { exclude: ["createdAt", "updatedAt", "categoryId"] },
      include: [
        { model: categoryModel, attributes: ["name", "slug"] },
        {
          separate: true,
          where: { status: true },
          model: productModel,
          attributes: { exclude: ["createdAt", "updatedAt", "status"] },
        },
      ],
    });
    if (!data) throw new Error("زیر دسته مورد نظر یافت نشد");
    res.send({ data });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const getAllSubCategory = asyncHandler(async (req, res) => {
  try {
    const data = await subCategoryModel.findAll({
      include: [{ model: categoryModel, attributes: ["name", "slug"] }],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!data.length) return res.send({ message: "هیچ دسته ای وجو ندارد" });
    res.send({ data });
  } catch (err) {
    throw customError(err, 401);
  }
});
