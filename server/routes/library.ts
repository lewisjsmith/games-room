import express from "express";

import {getGameById, createGame} from "../controllers/gameController";
import {getStudios} from "../controllers/studioController";
import {getGenres} from "../controllers/genreController";

export const router = express.Router();

router.post("/game/create", createGame);
router.get("/game/:id", getGameById);

router.post("/game/:id/update", () => {});
router.post("/game/:id/delete", () => {});
router.get("/games", () => {});

router.post("/studio/create", () => {});
router.get("/studio/:id", () => {});
router.post("/studio/:id/update", () => {});
router.post("/studio/:id/delete", () => {});
router.get("/studios", getStudios);

router.post("/console/create", () => {});
router.get("/console/:id", () => {});
router.post("/console/:id/update", () => {});
router.post("/console/:id/delete", () => {});
router.get("/consoles", () => {});

router.post("/genre/create", () => {});
router.get("/genre/:id", () => {});
router.post("/genre/:id/update", () => {});
router.post("/genre/:id/delete", () => {});
router.get("/genres", getGenres);

router.post("/gameinstance/create", () => {});
router.get("/gameinstance/:id", () => {});
router.post("/gameinstance/:id/update", () => {});
router.post("/gameinstance/:id/delete", () => {});