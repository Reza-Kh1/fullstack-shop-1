import asyncHandler from "express-async-handler";
import {
  detailProductModel,
  productModel,
  reviewModel,
  subCategoryModel,
  userModel,
} from "../models/index.js";
import { customError } from "../middlewares/errorHandler.js";
import pagination from "../middlewares/pagination.js";
import { Op } from "sequelize";
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
    totel,
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
      totel,
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
    totel,
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
    if (totel) {
      data.totel = totel;
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
          attributes: { exclude: ["updatedAt", "createdAt", "id", "postId"] },
        },
        { model: subCategoryModel, attributes: ["name"] },
      ],
      attributes: {
        exclude: ["status", "srcImg", "createdAt", "userId", "categoryId"],
      },
    });
    if (!data) throw new Error("محصولی وجود ندارد !");
    const review = await reviewModel.count({
      where: { postId: data.id, status: true },
    });
    res.send({
      data,
      review,
    });
  } catch (err) {
    throw customError(err, 404);
  }
});
export const getAllProduct = asyncHandler(async (req, res) => {
  let { page, name, price, order } = req.query;
  const limit = process.env.LIMIT;
  if (!page) {
    page = 1;
  }
  let filterOrder = [];
  let filter = {
    [Op.and]: [{ status: true }],
  };
  if (price) {
    const newPrice = price.split("-");
    filter[Op.and].push({
      price: { [Op.between]: [Number(newPrice[0]), Number(newPrice[1])] },
    });
  }
  if (name) {
    filter[Op.and].push({
      [Op.or]: [
        { name: { [Op.like]: "%" + name + "%" } },
        { description: { [Op.like]: "%" + name + "%" } },
        { keycode: { [Op.like]: "%" + name + "%" } },
      ],
    });
  }
  if (order) {
    const newOrder = order.split("-");
    filterOrder.push([newOrder[0], newOrder[1]]);
  }
  if (!filter[Op.and].length) {
    filter = {};
  }
  try {
    const data = await productModel.findAndCountAll({
      where: filter,
      limit: limit,
      offset: limit * page - limit,
      order: filterOrder,
      attributes: {
        exclude: [
          "createdAt",
          "keycode",
          "userId",
          "status",
          "useId",
          "id",
          "categoryId",
        ],
      },
      include: [{ model: subCategoryModel, attributes: ["name", "slug"] }],
    });
    const pager = pagination(data.count, limit, page);
    if (!data.count) return res.send({ message: "هیچ محصولی یافت نشد" });
    res.send({ ...data, pagination: pager });
  } catch (err) {
    customError(err, 404);
  }
});
export const getAllProductAdmin = asyncHandler(async (req, res) => {
  let { page, name, price, order, status } = req.query;
  const limit = process.env.LIMIT;
  if (!page) {
    page = 1;
  }
  let filterOrder = [];
  let filter = {
    [Op.and]: [{ status: status || false }],
  };
  if (price) {
    const newPrice = price.split("-");
    filter[Op.and].push({
      price: { [Op.between]: [Number(newPrice[0]), Number(newPrice[1])] },
    });
  }
  if (name) {
    filter[Op.and].push({
      [Op.or]: [
        { name: { [Op.like]: "%" + name + "%" } },
        { description: { [Op.like]: "%" + name + "%" } },
        { keycode: { [Op.like]: "%" + name + "%" } },
      ],
    });
  }
  if (order) {
    const newOrder = order.split("-");
    filterOrder.push([newOrder[0], newOrder[1]]);
  }
  if (!filter[Op.and].length) {
    filter = {};
  }
  try {
    const data = await productModel.findAndCountAll({
      where: filter,
      limit: limit,
      offset: limit * page - limit,
      order: filterOrder,
      attributes: {
        exclude: ["createdAt", "keycode", "userId", "status", "categoryId"],
      },
      include: [
        { model: userModel, attributes: ["name"] },
        { model: subCategoryModel, attributes: ["name"] },
      ],
    });
    const pager = pagination(data.count, limit, page);
    if (!data.count) return res.send({ message: "هیچ محصولی یافت نشد" });
    res.send({ ...data, pagination: pager });
  } catch (err) {
    customError(err, 404);
  }
});
export const getProductAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await productModel.findOne({
      where: { slug: id },
      attributes: { exclude: ["userId", "categoryId"] },
      include: [
        {
          model: detailProductModel,
          attributes: { exclude: ["updatedAt", "createdAt"] },
        },
        { model: userModel, attributes: ["name"] },
        { model: subCategoryModel, attributes: ["name"] },
      ],
    });
    if (!data) throw new Error("محصولی وجود ندارد !");
    res.send({ data });
  } catch (err) {
    throw customError(err, 404);
  }
});
export const createDetail = asyncHandler(async (req, res) => {
  const { title, keyward, skillProduct, text, srcImg } = req.body;
  const { id } = req.params;
  try {
    await detailProductModel.create({
      postId: id,
      title,
      keyward,
      skillProduct,
      text,
      srcImg,
    });
    res.send({ message: "توضیحات محصول ثبت شد" });
  } catch (err) {
    throw customError(err, 500);
  }
});
export const updateDetail = asyncHandler(async (req, res) => {
  const { title, keyward, skillProduct, text, srcImg } = req.body;
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
    if (srcImg) {
      data.srcImg = srcImg;
    }
    await data.save();
    res.send({ message: "توضیحات محصول ثبت شد" });
  } catch (err) {
    throw customError(err, 500);
  }
});
