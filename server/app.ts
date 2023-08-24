import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { router as libraryRouter } from "./routes/library";

export default function (databaseUri) {

    const app = express();

    // app.use(express.urlencoded());
    app.use(express.json());

    app.use("/api/v1/library", libraryRouter);

    mongoose.set("strictQuery", false);

    async function main() {
        await mongoose.connect(databaseUri);
    }

    try {
        main().catch((err) => console.log(err));
    } catch (err) {
        console.log(err);
    }

    return app;
}

