import express from "express";

import {getGameById, createGame, gameIndex, updateGame, deleteGame, getGamesList, getGamesByStudioId, getGamesByGenreId} from "../controllers/gameController";
import {getStudioById, getStudios, studioIndex, createStudio, updateStudio, deleteStudio} from "../controllers/studioController";
import {getGenres, getGenreById, genreIndex, createGenre, updateGenre, deleteGenre} from "../controllers/genreController";
import {getGameInstanceById, createGameInstance, gameInstanceIndex, updateGameInstance, deleteGameInstance, getGameInstancesList, getGameInstancesByGameId} from "../controllers/gameInstanceController";

export const router = express.Router();

router.post("/games", createGame);
router.get("/games/:id", getGameById);
router.put("/games/:id", updateGame);
router.delete("/games/:id", deleteGame);
router.get("/games", getGamesList);
// router.get("/game/", gameIndex);
router.get("/games/studio/:id", getGamesByStudioId);
router.get("/games/genre/:id", getGamesByGenreId);

router.post("/studios", createStudio);
router.get("/studios/:id", getStudioById);
router.put("/studios/:id", updateStudio);
router.delete("/studios/:id", deleteStudio);
router.get("/studios", getStudios);
// router.get("/studio/", studioIndex);

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