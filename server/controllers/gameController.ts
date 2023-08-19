import {GameModel as Game} from "../models/game";
import asyncHandler from "express-async-handler";

const index = asyncHandler(async (req, res, next) => {
    res.send("This is the Library Index");
});

const game = asyncHandler(async (req, res, next) => {
    res.send("This is the games section of the library!");
});

export const GameController = {index, game};