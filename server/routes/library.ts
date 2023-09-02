import express from "express";

import {getGameById, createGame, gameIndex, updateGame, deleteGame, getGamesList} from "../controllers/gameController";
import {getStudioById, getStudios, studioIndex, createStudio, updateStudio, deleteStudio} from "../controllers/studioController";
import {getGenres, getGenreById, genreIndex, createGenre, updateGenre, deleteGenre} from "../controllers/genreController";
import {getGameInstanceById, createGameInstance, gameInstanceIndex, updateGameInstance, deleteGameInstance, getGameInstancesList, getGameInstancesByGameId} from "../controllers/gameInstanceController";

export const router = express.Router();

router.post("/game/create", createGame);
router.get("/game/:id", getGameById);
router.post("/game/:id/update", updateGame);
router.post("/game/:id/delete", deleteGame);
router.get("/games", getGamesList);
router.get("/game/", gameIndex);

router.post("/studio/create", createStudio);
router.get("/studio/:id", getStudioById);
router.post("/studio/:id/update", updateStudio);
router.post("/studio/:id/delete", deleteStudio);
router.get("/studios", getStudios);
router.get("/studio/", studioIndex);

router.post("/genre/create", createGenre);
router.get("/genre/:id", getGenreById);
router.post("/genre/:id/update", updateGenre);
router.post("/genre/:id/delete", deleteGenre);
router.get("/genres", getGenres);
router.get("/genre/", genreIndex)

router.post("/gameinstance/create", createGameInstance);
router.get("/gameinstance/:id", getGameInstanceById);
router.post("/gameinstance/:id/update", updateGameInstance);
router.post("/gameinstance/:id/delete", deleteGameInstance);
router.get("/gameinstance/", gameInstanceIndex);
router.get("/gameinstances/", getGameInstancesList)
router.get("/gameinstances/:id", getGameInstancesByGameId)