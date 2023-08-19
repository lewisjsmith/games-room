import express from "express";
import mongoose from "mongoose";

const app = express();

const port: number = 3000;

app.get("/api/v1", (req, res) => {
    res.json({"result": "Hello Server!"});
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});