import express from "express";

import {GameController} from "../controllers/gameController";

export const router = express.Router();

router.get("/", GameController.index);

router.post("/game/create", () => {});
router.get("/game/:id", () => {});
router.post("/game/:id/update", () => {});
router.post("/game/:id/delete", () => {});
router.get("/games", () => {});

router.post("/studio/create", () => {});
router.get("/studio/:id", () => {});
router.post("/studio/:id/update", () => {});
router.post("/studio/:id/delete", () => {});
router.get("/studios", () => {});

router.post("/console/create", () => {});
router.get("/console/:id", () => {});
router.post("/console/:id/update", () => {});
router.post("/console/:id/delete", () => {});
router.get("/consoles", () => {});

router.post("/genre/create", () => {});
router.get("/genre/:id", () => {});
router.post("/genre/:id/update", () => {});
router.post("/genre/:id/delete", () => {});
router.get("/genre", () => {});

router.post("/gameinstance/create", () => {});
router.get("/gameinstance/:id", () => {});
router.post("/gameinstance/:id/update", () => {});
router.post("/gameinstance/:id/delete", () => {});