import { customError } from "../middlewares/errorHandler.js";
import { addressModel } from "../models/index.js";
import asyncHandler from "express-async-handler";
export const createAddress = asyncHandler(async (req, res) => {
  const { name, city, address, phone, postalCode, town } = req.body;
  const id = res.userInfo.id;
  try {
    const data = await addressModel.create({
      name,
      city,
      address,
      phone,
      postalCode,
      town,
      userId: id,
    });
    res.send({ data });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const deleteAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await addressModel.destroy({ where: { id } });
    if (!data) throw new Error("آدرس مورد نظر حذف نشد !");
    res.send({ message: "آدرس با موفقیت حذف شد" });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const updateAddress = asyncHandler(async (req, res) => {
  const { name, city, address, phone, postalCode, town } = req.body;
  const { id } = req.params;
  try {
    const data = await addressModel.findByPk(id);
    if (!data) throw new Error("آدرس یافت نشد!!!!");
    if (name) {
      data.name = name;
    }
    if (city) {
      data.city = city;
    }
    if (address) {
      data.address = address;
    }
    if (phone) {
      data.phone = phone;
    }
    if (postalCode) {
      data.postalCode = postalCode;
    }
    if (town) {
      data.town = town;
    }
    await data.save();
    res.send({ message: "با موفقیت به روز شد" });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const getAddress = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  const id = res.userInfo.id;
  try {
    const data = await addressModel.findOne({ where: { userId: id } });
    if (!data) throw new Error("ادرس یافت نشد !");
    res.send({ data });
  } catch (err) {
    throw customError(err, 401);
  }
});
