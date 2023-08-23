import asyncHandler from "express-async-handler";
import GenreModel from "../models/genre";

export const getGenres = asyncHandler(async (req, res, next) => {

    const genres = await GenreModel.find({}).lean().exec();
    res.json(genres);

});