import { interestModel } from "../models/index.js";
import { customError } from "../middlewares/errorHandler.js";
import asyncHandler from "express-async-handler";
export const createInterest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = res.userInfo;
  try {
    await interestModel.create({ postId: id, userId: user.id });
    res.send({ success: true });
  } catch (err) {
    customError(err, 401);
  }
});

export const deleteInterest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = res.userInfo;
  try {
    await interestModel.destroy({ postId: id, userId: user.id });
    res.send({ success: true });
  } catch (err) {
    customError(err, 401);
  }
});
