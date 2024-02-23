import asynHandler from "express-async-handler";
import {
  basicCategoryModel,
  categoryModel,
  subCategoryModel,
} from "../models/index.js";
import { customError } from "../middlewares/errorHandler.js";
export const createBasicCategory = asynHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(401).send("تمام فیلد هارا پر کنید");
  try {
    const data = await basicCategoryModel.create({ name });
    res.send({ success: true });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const deleteBasicCategory = asynHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await basicCategoryModel.destroy({ where: { id } });
    if (!data) return res.status(404).send({ success: false });
    res.send({ success: true });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const updateBasicCategory = asynHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const data = await basicCategoryModel.findByPk(id);
    if (!data)
      res.status(404).send({ message: "هیچ دسته ای با این اسم یافت نشد" });
    if (name) {
      data.name = name;
    }
    await data.save();
    res.send({ success: true });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const getBasicCategory = asynHandler(async (req, res) => {
  const data = await basicCategoryModel.findAll({
    include: [
      {
        model: categoryModel,
        attributes: ["slug", "name"],
        include: [{ model: subCategoryModel, attributes: ["slug","name"] }],
      },
    ],
  });
  res.send([...data]);
});
