import asyncHandler from "express-async-handler";
import { addressModel, cartModel, userModel } from "../models/index.js";
import { customError } from "../middlewares/errorHandler.js";
import { compareHash, createHash } from "../utils/createHash.js";
import createToken from "../utils/createToken.js";
import token from "jsonwebtoken";
export const createUser = asyncHandler(async (req, res) => {
  let { phone, name, password, role, email } = req.body;
  if (!phone || !name || !password) {
    throw customError("تمامیه فیلد های لازم را پر کنید", 400);
  }
  if (role) {
    const cookie = req.cookies.user;
    const userInfo = token.verify(cookie, process.env.TOKEN_SECURET);
    if (userInfo.role !== "ADMIN")
      throw customError("شما مجاز به این عملیات نیستید", 403);
  }
  try {
    const count = await userModel.count();
    if (!count) role = "ADMIN";
    const hash = await createHash(password);
    const data = await userModel.create({
      phone,
      name,
      password: hash,
      role,
      email,
    });
    const body = notPass(data);
    const token = await createToken(body);
    if (data.role !== "USER" && !role) {
      res.cookie("user", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }
    res.send({ data: { body, token } });
  } catch (err) {
    throw customError(err || "خطای ناشناخته لطفا دوباره تلاش کنید !", 500);
  }
});
export const loginUser = asyncHandler(async (req, res) => {
  const { password, phone, email } = req.body;
  const whereClause = {};
  if (phone) whereClause.phone = phone;
  if (email) whereClause.email = email;
  try {
    const data = await userModel.findOne({
      where: whereClause,
    });
    if (!data)
      return res.send({
        message: "هیچ کاربری با این شماره یا ایمیل یافت نشد",
      });
    await compareHash(password, data.password);
    const body = notPass(data);
    const token = await createToken(body);
    if (data.role !== "USER") {
      res.cookie("user", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }
    res.send({ data: { body, token } });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await userModel.destroy({ where: { id } });
    if (!data) throw customError("کاربر حذف نشد دوباره تلاش کنید", 404);
    res.send({ message: "کاربر با موفقیت حذف شد" });
  } catch (err) {
    throw customError(err, 404);
  }
});
export const updateUser = asyncHandler(async (req, res) => {
  const { name, password, email, role, id } = req.body;
  const info = res.userInfo;
  try {
    const data = await userModel.findByPk(id ? id : info.id);
    if (!data) throw new Error("کاربر یافت نشد");
    if (id && info.role !== "ADMIN")
      throw new Error("شما مجاز به این عملیات نیستید");
    if (name) {
      data.name = name;
    }
    if (password) {
      data.password = await createHash(password);
    }
    if (email) {
      data.email = email;
    }
    if (role) {
      data.role = role;
    }
    await data.save();
    const body = notPass(data);
    const token = await createToken(body);
    res.send({ data: { body, token } });
  } catch (err) {
    throw customError(err, 401);
  }
});
export const loginToken = asyncHandler(async (req, res) => {
  const token = await res.userInfo;
  const data = await userModel.findByPk(token.id);
  if (!data) throw customError("لطفا دوباره وارد حساب کاربری خود شوید !", 403);
  const body = notPass(data);
  res.send({ message: "💕خوش آمدید " + token.name, data: body });
});
export const getAllUser = asyncHandler(async (req, res) => {
  let { page } = req.query;
  if (!page) page = 1;
  const limit = 10;
  try {
    const data = await userModel.findAndCountAll({
      limit: limit,
      offset: page * limit - limit,
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["password"] },
    });
    if (!data.count) return res.send({ message: "هیچ کاربری وجود ندارد" });
    res.send({ data });
  } catch (err) {
    throw customError("خطای ناشناخته", 500);
  }
});
export const loginAdmin = asyncHandler(async (req, res) => {
  const info = res.userInfo;
  const data = await userModel.findByPk(info.id);
  if (data.role === "USER") throw customError("اجازه دسترسی ندارید!", 403);
  const body = notPass(data);
  res.send({ message: "💕خوش آمدید " + info.name, data: body });
});
export const getProfile = asyncHandler(async (req, res) => {
  const id = res.userInfo.id;
  try {
    const data = await userModel.findByPk(id, {
      include: [{ model: cartModel }, { model: addressModel }],
    });
    res.send({ data });
  } catch (err) {
    throw customError(err, 404);
  }
});
const notPass = (data) => {
  let res = {
    id: data.id,
    name: data.name,
    phone: data.phone,
    email: data.email,
  };
  if (data.role !== "USER") {
    res.role = data.role;
  }
  return res;
};
