import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import { router as libraryRouter } from "./routes/library";

const app = express();

const port: number = 3000;

// app.use(express.urlencoded());
app.use(express.json());

dotenv.config();

try {

    if (process.env.SECRET_KEY) {

        const mongoDB = process.env.SECRET_KEY;

        mongoose.set("strictQuery", false);

        async function main() {
            await mongoose.connect(mongoDB);
        }

        main().catch((err) => console.log(err));

    } else {
        throw new Error("Invalid Key");
    }

} catch (err) {
    console.log(err);
}

app.use("/api/v1/library", libraryRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

export default app; 