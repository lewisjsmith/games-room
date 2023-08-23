import GameModel from "../models/game";

import express from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

/* router.post("/game/create", () => {});
router.get("/game/:id", () => {});
router.post("/game/:id/update", () => {});
router.post("/game/:id/delete", () => {});
router.get("/games", () => {}); */

export const gameIndex = asyncHandler(async (req, res, next) => {
    res.status(400).json({errors: "Invalid URL"});
})

export const getGameById = asyncHandler(async (req, res, next) => {

    let game = [{ "_id": "", "title": "" }];

    try {
        game = await GameModel.find({ _id: req.params.id })
            .select({"_id": 0, "title": 1 }).lean().exec();
        res.json(game);
    }
    catch (err) {
        res.status(400).json({errors: "Invalid URL"});
    }

});


export const createGame = asyncHandler(async (req, res, next) => {

    const body: GameBody = req.body;

    // working, just needs better typing or fail conditions for not knowing genre
    const details = { title: body.title, studio: body.studio, genre: body.genre, releaseDate: body.releaseDate }
    const game = new GameModel(details);
    await game.save();
    console.log(`Added game: ${details.title}`);
    res.end();

});

interface GameBody {
    title: string,
    studio: mongoose.Types.ObjectId,
    genre: mongoose.Types.ObjectId,
    releaseDate: Date
}