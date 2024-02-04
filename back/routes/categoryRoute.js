import express from "express"
import { createCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from "../controllers/categoryCtrl.js"
const routes = express.Router()
routes.route("/").get(getAllCategory).post(createCategory)
routes.route("/:id").delete(deleteCategory).put(updateCategory).get(getCategory)
export default routes