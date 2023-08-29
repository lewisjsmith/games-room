import express from "express";

import {getGameById, createGame, gameIndex, updateGame, deleteGame, getGamesList} from "../controllers/gameController";
import {getStudioById, getStudios, studioIndex, createStudio, updateStudio, deleteStudio} from "../controllers/studioController";
import {getGenres, getGenreById, genreIndex, createGenre, updateGenre} from "../controllers/genreController";

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
router.post("/genre/:id/delete", () => {});
router.get("/genres", getGenres);
router.get("/genre/", genreIndex)

router.post("/gameinstance/create", () => {});
router.get("/gameinstance/:id", () => {});
router.post("/gameinstance/:id/update", () => {});
router.post("/gameinstance/:id/delete", () => {});

router.post("/console/create", () => {});
router.get("/console/:id", () => {});
router.post("/console/:id/update", () => {});
router.post("/console/:id/delete", () => {});
router.get("/consoles", () => {});