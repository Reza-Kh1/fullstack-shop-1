import asyncHandler from "express-async-handler";
import { detailProductModel, productModel } from "../models/index.js";
import { customError } from "../middlewares/errorHandler.js";
import pagination from "../middlewares/pagination.js";
import dotenv from "dotenv";
dotenv.config();
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    off,
    altImg,
    srcImg,
    slug,
    description,
    status,
    categoryId,
    total,
  } = req.body;
  const info = res.userInfo;
  try {
    const data = await productModel.create({
      userId: info.id,
      categoryId,
      name,
      price,
      off,
      altImg,
      srcImg,
      slug,
      description,
      status,
      total,
    });
    res.send({ data });
  } catch (err) {
    throw customError(err, 500);
  }
});
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await productModel.destroy({ where: { id } });
    if (!data) throw new Error("محصول حذف نشد!");
    res.send({ message: "محصول حذف شد" });
  } catch (err) {
    throw customError(err, 500);
  }
});
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    off,
    altImg,
    srcImg,
    slug,
    status,
    description,
    categoryId,
    total,
  } = req.body;
  try {
    const data = await productModel.findOne({ where: { slug: id } });
    if (!data) throw new Error("محصول یافت نشد !");
    if (name) {
      data.name = name;
    }
    if (price) {
      data.price = price;
    }
    if (categoryId) {
      data.categoryId = categoryId;
    }
    if (off) {
      data.off = off;
    }
    if (altImg) {
      data.altImg = altImg;
    }
    if (srcImg) {
      data.srcImg = srcImg;
    }
    if (status) {
      data.status = status;
    }
    if (slug) {
      data.slug = slug;
    }
    if (description) {
      data.description = description;
    }
    if (total) {
      data.total = total;
    }
    data.save();
    res.send({ message: "محصول آپدیت شد" });
  } catch (err) {
    throw customError(err, 500);
  }
});
export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await productModel.findOne({
      where: { slug: id, status: true },
      include: [
        {
          model: detailProductModel,
          attributes: { exclude: ["updatedAt", "createdAt"] },
        },
      ],
    });
    if (!data) throw new Error("محصولی وجود ندارد !");
    res.send({ data });
  } catch (err) {
    throw customError(err, 404);
  }
});
export const getAllProduct = asyncHandler(async (req, res) => {
  let { page } = req.query;
  const limit = 10;
  if (!page) {
    page = 1;
  }
  try {
    const data = await productModel.findAndCountAll({
      where: { status: true },
      limit: limit,
      offset: limit * page - limit,
      order: [["createdAt", "DESC"]],
    });
    const pager = pagination(data.count, limit, page);
    if (!data.count) return res.send({ message: "هیچ محصولی یافت نشد" });
    res.send({ data: { data, pagination: pager } });
  } catch (err) {
    customError(err, 404);
  }
});
export const getAllProductAdmin = asyncHandler(async (req, res) => {
  let { page, status } = req.query;
  const limit = 10;
  if (!page) {
    page = 1;
  }
  if (!status) {
    status = true;
  }
  try {
    const data = await productModel.findAndCountAll({
      where: {},
      limit: limit,
      offset: limit * page - limit,
      order: [["createdAt", "DESC"]],
    });
    const pager = pagination(data.count, limit, page);
    if (!data.count) return res.send({ message: "هیچ محصولی یافت نشد" });
    res.send({ data: { data, pagination: pager } });
  } catch (err) {
    customError(err, 404);
  }
});
export const getProductAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await productModel.findOne({
      where: { slug: id },
      include: [
        {
          model: detailProductModel,
          attributes: { exclude: ["updatedAt", "createdAt"] },
        },
      ],
    });
    if (!data) throw new Error("محصولی وجود ندارد !");
    res.send({ data });
  } catch (err) {
    throw customError(err, 404);
  }
});
export const createDetail = asyncHandler(async (req, res) => {
  const { title, keyward, skillProduct, text } = req.body;
  const { id } = req.params;
  try {
    await detailProductModel.create({
      postId: id,
      title,
      keyward,
      skillProduct,
      text,
    });
    res.send({ message: "توضیحات محصول ثبت شد" });
  } catch (err) {
    throw customError(err, 500);
  }
});
export const updateDetail = asyncHandler(async (req, res) => {
  const { title, keyward, skillProduct, text } = req.body;
  const { id } = req.params;
  try {
    const data = await detailProductModel.findByPk(id);
    if (!data) throw new Error("توضیحات یافت نشد !!! دوباره بسازید");
    if (title) {
      data.title = title;
    }
    if (keyward) {
      data.keyward = keyward;
    }
    if (skillProduct) {
      data.skillProduct = skillProduct;
    }
    if (text) {
      data.text = text;
    }
    await data.save();
    res.send({ message: "توضیحات محصول ثبت شد" });
  } catch (err) {
    throw customError(err, 500);
  }
});
