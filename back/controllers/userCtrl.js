import asyncHandler from "express-async-handler";
import { addressModel, cartModel, userModel } from "../models/index.js";
import { customError } from "../middlewares/errorHandler.js";
import { compareHash, createHash } from "../utils/createHash.js";
import createToken from "../utils/createToken.js";
import token from "jsonwebtoken";
import nodemailer from "nodemailer";
import pagination from "../middlewares/pagination.js";
import { Op } from "sequelize";
export const createUser = asyncHandler(async (req, res) => {
  let { phone, name, password, role, email } = req.body;
  if (!phone || !name || !password) {
    throw customError("تمامیه فیلد های لازم را پر کنید", 400);
  }
  if (role) {
    const cookie = req.cookies?.user;
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
  if (!phone && !email)
    return res.status(403).send({ message: "اطلاعات رو کامل پر کنید" });
  try {
    const data = await userModel.findOne({
      where: whereClause,
      include: [{ model: cartModel }],
    });
    if (!data)
      return res.status(404).send({
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
    res.send({ data: { body, token, product: data.carts } });
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
    throw customError(err, 403);
  }
});
export const getAllUser = asyncHandler(async (req, res) => {
  let { page } = req.query;
  if (!page) page = 1;
  const limit = process.env.LIMIT;
  try {
    const data = await userModel.findAndCountAll({
      limit: limit,
      offset: page * limit - limit,
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["password"] },
    });
    const pager = pagination(data.count, limit, page);
    if (!data.count) return res.send({ message: "هیچ کاربری وجود ندارد" });
    res.send({ data: { ...data, pagination: pager } });
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
      attributes: { exclude: ["id","password", "createdAt", "updatedAt"] },
    });
    res.send({ data });
  } catch (err) {
    throw customError(err, 404);
  }
});
export const verifyPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const verify = await userModel.findOne({ where: { email } });
    if (!verify)
      throw new Error(
        "با این ایمیل کسی ثبت نام نکرده است لطفا ایمیل را چک کنید تا درست باشد"
      );
    const newPass = [...Array(8)]
      .map((i) => (~~(Math.random() * 36)).toString(36))
      .join("");
    const transporter = nodemailer.createTransport({
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: "emailwebsite2024@gmail.com",
        pass: "hexh zbsk orwh tinr",
      },
    });
    const mailOptions = {
      from: "emailwebsite2024@gmail.com",
      to: email,
      subject: "باز نشانی رمز عبور کلبه ساحلی",
      text: `حتما پس از ورود به حساب کاربری خود رمز عبور خود را تغییر دهید و در دسرس ما بقی افراد قرار ندهید مرز عبور : ${newPass}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw customError(error, 404);
      }
    });
    verify.password = await createHash(newPass);
    verify.save();
    res.send({ message: "رمز عبور جدید به ایمیل شما ارسال شد" });
  } catch (err) {
    throw customError(err, 404);
  }
});
export const searchUser = asyncHandler(async (req, res) => {
  let { email, phone, role, name, order } = req.query;
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  let filterOrder = [];
  if (order) {
    filterOrder.push(["createdAt", order]);
  } else {
    filterOrder.push(["createdAt", "DESC"]);
  }
  const limit = process.env.LIMIT;
  let filter = {
    [Op.or]: [],
  };
  if (name) {
    filter[Op.or].push({ name: { [Op.like]: "%" + name + "%" } });
  }
  if (email) {
    filter[Op.or].push({ email: { [Op.like]: "%" + email + "%" } });
  }
  if (role) {
    filter[Op.or].push({ role });
  }
  if (phone) {
    filter[Op.or].push({ phone: { [Op.like]: "%" + phone + "%" } });
  }
  if (!filter[Op.or].length) {
    filter = {};
  }
  const data = await userModel.findAndCountAll({
    where: filter || {},
    order: filterOrder,
    limit: limit,
    offset: page * limit - limit,
  });
  const pager = pagination(data.count, limit, page);
  res.send({ data: { pagination: pager, ...data } });
});
export const logOut = asyncHandler(async (req, res) => {
  res.cookie("user", "", { expires: new Date(0) });
  res.send({ message: "logOut" });
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
