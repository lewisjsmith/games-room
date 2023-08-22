import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import {router as libraryRouter} from "./routes/library";

const app = express();

const port: number = 3000;

app.use(express.urlencoded());

dotenv.config();
const mongoDB = process.env.SECRET_KEY;

mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

app.use("/api/v1/library", libraryRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});