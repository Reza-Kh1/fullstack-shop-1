import asyncHnader from "express-async-handler"
import { customError } from "../middlewares/errorHandler.js"
import { messageModel } from "../models"
import pagination from "../middlewares/pagination.js"
export const createMessasge = asyncHnader(async (req, res) => {
    const { name, userId } = req.body
    const info = res.userInfo

    console.log(info);
    try {
        // const data = await messageModel.create({name,userId})
        res.send({ success: true })
    } catch (err) {
        throw customError(err, 401)
    }
})
export const replyMessage = asyncHnader(async (req, res) => {
    const { text, replyId } = req.body
    try {
        const data = await messageModel.create({ text, replyId })
    } catch (err) {
        throw customError(err, 401)
    }
})
export const getMessasge = asyncHnader(async (req, res) => {
    const info = res.userInfo
    try {
        console.log(info.id);
        const data = await messageModel.findAll({ where: { userId: info.id }, order: [["createdAt"]] })
        res.send({ ...data })
    } catch (err) {
        throw customError(err, 401)
    }
})
export const getAllMessasgeAmin = asyncHnader(async (req, res) => {
    let { status, page } = req.query
    if (!page) {
        page = 1
    }
    const limit = process.env.LIMIT
    try {
        const data = await messageModel.findAndCountAll({
            where: { status },
            offset: limit * page - limit, limit: limit,
            order: [["createdAt", "DESC"]]
        })
        if (!data.count) {
            res.send({ message: "پیامی وجود ندارد" })
        }
        const pager = pagination(data.count, limit, page)
        res.send({ ...data, pagination: pager })
    } catch (err) {
        throw customError(err, 500)
    }
})
export const updateMessage = asyncHnader(async (req, res) => {
    const { id } = req.params
    try {
        const data = await messageModel.findByPk(id)
        if (!data) return res.send({ message: "یافت نشد" })
        data.status = true
        await data.save()
        res.send({ success: true })
    } catch (err) {
        throw customError(err, 401)
    }
}) 