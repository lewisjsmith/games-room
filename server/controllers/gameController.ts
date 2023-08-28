import GameModel from "../models/game";
import StudioModel from "../models/studio";
import GenreModel from "../models/genre";
import express from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

/* 
router.get("/games", () => {}); 
*/

// const placeholder = new Date();
// const offset = placeholder.getTimezoneOffset()/60;
// const d = new Date(1992, 9, 10, -offset)

export const gameIndex = asyncHandler(async (req, res, next) => {
    res.status(400).json({ errors: "Invalid URL." });
})

export const getGameById = asyncHandler(async (req, res, next) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ errors: "Not an ObjectId." })
    }

    try {
        const game = await GameModel
            .find({ _id: req.params.id })
            .select({ "__v": 0 }).lean().exec();

        if (game.length === 0) {
            res.status(404).json({errors: "Game not found."})
        } else {
            res.status(200).json(game[0]);
        }

    }
    catch (err) {
        res.status(400).json({ errors: "Invalid URL." });
    }
});

// need to not allow duplicate names
export const createGame = asyncHandler(async (req, res, next) => {

    const body: GameBody = req.body;

    const details = { title: body.title, studio: body.studio, genre: body.genre, releaseDate: body.releaseDate }
    const game = new GameModel(details);

    try {

        const response = await game.save();
        res.status(200).json({ "_id": response["_id"] });

    } catch (err: any) {

        const keys = Object.keys(err.errors);
        const errorFields = keys.join(" and ");
        const errorBody = { errors: `Invalid input(s) for ${errorFields}` };
        res.status(400).json(errorBody);

    }

});

export const updateGame = asyncHandler(async (req, res, next) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ errors: "Invalid ID format." });
    }

    const body: UpdateBody = req.body;

    if (Object.keys(body).length === 0) {
        res.status(400).json({ errors: "No updates requested." });
    }

    if (Object.keys(body).includes("title") && body.title?.trim() === "") {
        res.status(400).json({ errors: "No input title." });
    }

    async function getStudioId() {
        const response = await StudioModel
            .find({ "title": body.studio })
            .select({ "_id": 1 })
            .lean()
            .exec()

        return response[0]["_id"];
    }

    async function getGenreId() {
        const response = await GenreModel
            .find({ "title": body.genre })
            .select({ "_id": 1 })
            .lean()
            .exec()

        return response[0]["_id"];
    }

    if (Object.keys(body).includes("studio") && !Object.keys(body).includes("genre")) {

        const studio = await getStudioId();
        body.studio = studio;

        try {
            const response = await GameModel
                .findOneAndUpdate({ "_id": req.params.id }, body);
            res.status(200).json({ "_id": req.params.id });
        } catch (err) {
            res.status(400).json(err);
        }

    }

    if (!Object.keys(body).includes("studio") && Object.keys(body).includes("genre")) {

        const genre = await getGenreId();
        body.genre = genre;

        try {
            const response = await GameModel
                .findOneAndUpdate({ "_id": req.params.id }, body);
            res.status(200).json({ "_id": req.params.id });
        } catch (err) {
            res.status(400).json(err);
        }

    }

    if (Object.keys(body).includes("studio") && Object.keys(body).includes("genre")) {

        const studio = await getStudioId()
        const genre = await getGenreId();

        Promise.all([studio, genre])
            .then(async (values) => {

                body.studio = values[0];
                body.genre = values[1];

                try {
                    const response = await GameModel
                        .findOneAndUpdate({ "_id": req.params.id }, body);
                    res.status(200).json({ "_id": req.params.id });
                } catch (err) {
                    res.status(400).json(err);
                }

            })




    }

    if (!Object.keys(body).includes("studio") && !Object.keys(body).includes("genre")) {

        try {
            const response = await GameModel
                .findOneAndUpdate({ "_id": req.params.id }, body);
            if (response) {
                res.status(200).json({ "_id": req.params.id });
            } else {
                res.status(400).json({ errors: "Invalid ID." });
            }


        } catch (err) {
            res.status(400).json(err);
        }
    }

})

export const deleteGame = asyncHandler(async (req, res, next) => {

    try {

        const response = await GameModel
            .findOneAndRemove({ "_id": req.params.id });

        if (response) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ errors: "ID not found." });
        }

    } catch (err) {
        res.status(400).json({ errors: err });
    }

});

export const getGamesList = asyncHandler(async (req, res, next) => {

    try {
        const response = await GameModel
            .find({})
            .lean()
            .exec();

        if (response) {
            res.status(200).json(response);
        } else {
            res.status(400).json({ errors: "Games list not found." });
        }
    } catch (err) {
        res.status(400).json({ errors: err });
    }

});

interface GameBody {
    title: string,
    studio: mongoose.Types.ObjectId,
    genre: mongoose.Types.ObjectId,
    releaseDate: Date
}

interface UpdateBody {
    title?: string,
    studio?: mongoose.Types.ObjectId,
    genre?: mongoose.Types.ObjectId,
    releaseDate?: Date
}