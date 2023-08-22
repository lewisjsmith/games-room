import GameModel from "../models/game";

import express from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

/* router.post("/game/create", () => {});
router.get("/game/:id", () => {});
router.post("/game/:id/update", () => {});
router.post("/game/:id/delete", () => {});
router.get("/games", () => {}); */

const getGameById = asyncHandler(async (req, res, next) => {
    const game = await GameModel.find({ _id: req.params.id })
        .select({ "_id": 0, "title": 1 }).lean().exec();
    res.json(game);
});

const createGame = asyncHandler(async (req, res, next) => {

    const body = req.body;

    console.log(body);

    // working, just needs better typing or fail conditions for not knowing genre
    const details = {title: body.title, studio: body.studio, genre: body.genre, releaseDate: body.releaseDate }
    const game = new GameModel(details);
    await game.save();
    console.log(`Added game: ${details.title}`);
    res.end();
});

module.exports = { getGameById, createGame };