import { dataBase } from "../config/db.js";

const interestModel = dataBase.define(
  "interest",
  {},
  { timestamps: true, tableName: "interest" }
);
export default interestModel;