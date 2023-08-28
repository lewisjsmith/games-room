import asyncHandler from "express-async-handler";
import StudioModel from "../models/studio";
import mongoose from "mongoose";

export const studioIndex = asyncHandler(async (req, res, next) => {
    res.status(400).json({ errors: "Invalid URL." });
})

export const getStudioById = asyncHandler(async (req, res, next) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ errors: "Not a valid ObjectId." })
    }

    try {
        const studio = await StudioModel
            .find({ _id: req.params.id })
            .select({ "__v": 0 }).lean().exec();

        if (studio.length > 0) {
            res.status(200).json(studio[0]);
        } else {
            res.status(404).json({ errors: "Studio not found." })
        }

    }
    catch (err) {
        res.status(400).json({ errors: "Invalid URL." });
    }

});

export const createStudio = asyncHandler(async (req, res, next) => {

    const details = { "title": req.body.title, "founded": req.body.founded };

    const studio = new StudioModel(details)

    try {
        const response = await studio.save();
        res.status(200).json(response);
    } catch (err) {
        const keys = Object.keys(err.errors);
        const errorFields = keys.join(" and ");
        const errorBody = { errors: `Invalid input(s) for ${errorFields}` };
        res.status(400).json(errorBody);
    }



});

// WIP
export const updateStudio = asyncHandler(async (req, res, next) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ errors: "Invalid ID format." });
    }

    const body = req.body;

    const errors = [];

    if (Object.keys(body).length === 0) {
        res.status(400).json({ errors: "No updates requested." });
    }

    if (Object.keys(body).includes("title") && body.title?.trim() === "") {
        res.status(400).json({ errors: "No input title." });
    }

    try {
        const response = await StudioModel
            .findOneAndUpdate({ "_id": req.params.id }, body);


        if (response === null) {
            res.status(404).json({ errors: "ID not found." })
        } else {
            res.status(200).json({ "_id": req.params.id });
        }

    } catch (err) {
        res.status(400).json({ errors: err.errors });
    }

});

export const deleteStudio = asyncHandler(async (req, res, next) => {

    try {
        const response = await StudioModel
            .findOneAndRemove({ "_id": req.params.id })

        if (response) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ errors: "ID not found." });
        }
    } catch (err) {
        res.status(400).json({errors: err.errors});
    }



});

export const getStudios = asyncHandler(async (req, res, next) => {

    const studios = await StudioModel.find({}).lean().exec();
    res.json(studios);

});

