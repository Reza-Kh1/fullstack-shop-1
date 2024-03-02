import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDb } from "../config/db.js";
import { globalHandler, notFound } from "../middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import userRoute from "../routes/userRoute.js";
import categoryRoute from "../routes/categoryRoute.js";
import subCategoryRoute from "../routes/subCategoryRoute.js";
import basicCategoryRoute from "../routes/basicCategoryRoute.js";
import productRoute from "../routes/productRoute.js";
import reviewtRoute from "../routes/reviewRoute.js";
import offRoute from "../routes/offRoute.js";
import addressRoute from "../routes/addressRoute.js";
import cartRoute from "../routes/cartRoute.js";
import paymentRoute from "../routes/paymentRoute.js";
import imagetRoute from "../routes/imageRoute.js";
import messageRoute from "../routes/messageRoute.js";
// static
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// configs
dotenv.config();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:3000"],
    credentials: true, // اجازه دادن به درخواست های با credentials
  })
);
app.use(helmet.xssFilter());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(cookieParser());
connectDb();
const api = process.env.API_URL;
// routes
app.use(api + "user", userRoute);
app.use(api + "category", categoryRoute);
app.use(api + "sub-category", subCategoryRoute);
app.use(api + "basic-category", basicCategoryRoute);
app.use(api + "product", productRoute);
app.use(api + "review", reviewtRoute);
app.use(api + "off", offRoute);
app.use(api + "address", addressRoute);
app.use(api + "cart", cartRoute);
app.use(api + "payment", paymentRoute);
app.use(api + "image", imagetRoute);
app.use(api + "message", messageRoute);
// middlewares
app.use(globalHandler);
app.use(notFound);
export default app;
