import { DataTypes } from "sequelize"
import { dataBase } from "../config/db.js"
import { userModel } from "./index.js"
const messageModel = dataBase.define("message", {
    name: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: userModel,
            key: "id",
        },
    },
    text: {
        type: DataTypes.TEXT,
        defaultValue: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    createdAt: true,
    updatedAt: false,
    tableName: "message",
    indexes: [{ unique: false, fields: ["userId", "status"] }]
})
export default messageModel