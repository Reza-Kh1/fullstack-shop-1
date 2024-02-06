import express from "express"
import { createImage, deleteImage, getAllFileImage, getAllImage } from "../controllers/imageCtrl.js"
import { uploadImage } from "../middlewares/upload.js"
const routes = express.Router()
routes.route("/").post(uploadImage, createImage).get(getAllImage)
routes.route("/:id").delete(deleteImage).get(getAllFileImage)

export default routes