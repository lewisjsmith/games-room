import asyncHandler from "express-async-handler";
import StudioModel from "../models/studio";

const getStudios = asyncHandler(async (req, res, next) => {

    const studios = await StudioModel.find({}).lean().exec();
    res.json(studios);
    
});

module.exports = {getStudios}