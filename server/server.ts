import express from "express";
import mongoose from "mongoose";

import {router as libraryRouter} from "./routes/library";

const app = express();

const port: number = 3000;

app.use("/library", libraryRouter);

app.use("/*", (req, res) => {
    res.send("404, not found.");
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});