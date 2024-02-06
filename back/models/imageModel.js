import { DataTypes } from "sequelize";
import { dataBase } from "../config/db.js";

const imageModel = dataBase.define("image", {
    url: {
        type: DataTypes.STRING
    }
}, { timestamps: true, tableName: "image" })
export default imageModel