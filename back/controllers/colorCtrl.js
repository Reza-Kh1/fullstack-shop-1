import { customError } from "../middlewares/errorHandler.js";
import { colorModel } from "../models/index.js";
import asynHandler from "express-async-handler"
export const createColor = asynHandler(async (req, res) => {
    const { color, codeColor, price, total, discount, postId, endDiscount } = req.body
    try {
        const data = await colorModel.create({ color, codeColor, price, total, discount, postId, endDiscount, totalPrice: price - discount })
        res.send({ data })
    } catch (err) {
        throw customError(err, 401)
    }
})
export const updateColor = asynHandler(async (req, res) => {
    const { id } = req.params
    const { color, codeColor, price, total, discount, endDiscount } = req.body
    try {
        const data = await colorModel.findByPk(id)
        if (color) {
            data.color = color
        }
        if (codeColor) {
            data.codeColor = codeColor
        }
        if (price) {
            data.price = price
        }
        if (total) {
            data.total = total
        }
        if (discount) {
            data.discount = discount
        }
        data.endDiscount = endDiscount || null
        data.totalPrice = price || data.price - discount || data.discount
        await data.save()
        res.send({ success: true })
    } catch (err) {
        throw customError(err, 401)
    }
})
export const deleteColor = asynHandler(async (req, res) => {
    const { id } = req.params
    try {
        const data = await colorModel.destroy({ where: { id } })
        if (!data) {
            res.status(404).send({ success: false })
        }
        res.send({ success: true })
    } catch (err) {
        throw customError(err)
    }
})