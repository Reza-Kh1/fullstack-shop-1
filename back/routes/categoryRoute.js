import express from "express"
import { createCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from "../controllers/categoryCtrl.js"
import isAuthor from "../utils/isAuthor.js"
const routes = express.Router()
routes.route("/").get(getAllCategory).post(isAuthor, createCategory)
routes.route("/:id").delete(isAuthor, deleteCategory).put(isAuthor, updateCategory).get(getCategory)
export default routes