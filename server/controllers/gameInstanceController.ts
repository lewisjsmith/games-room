import GameInstanceModel from "../models/gameInstance";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";

// const placeholder = new Date();
// const offset = placeholder.getTimezoneOffset()/60;
// const d = new Date(1992, 9, 10, -offset)

export const gameInstanceIndex = asyncHandler(async (req, res, next) => {
  res.status(400).json({ errors: "Invalid URL." });
});

export const getGameInstanceById = asyncHandler(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ errors: "Not a valid ObjectId." });
  }

  try {
    const gameInstance = await GameInstanceModel.findOne({ _id: req.params.id })
      .select({ __v: 0 })
      .lean()
      .exec();

    if (gameInstance) {
      res.status(200).json(gameInstance);
    } else {
      res.status(404).json({ errors: "GameInstance not found." });
    }
  } catch (err) {
    res.status(400).json({ errors: "Invalid URL." });
  }
});

export const createGameInstance = asyncHandler(async (req, res, next) => {
  const details = {
    game: req.body.game,
    status: req.body.status,
    due_back: req.body.due_back,
  };

  try {
    const gameInstance = new GameInstanceModel(details);
    const success = await gameInstance.save();
    if (success) {
      res.status(200).json({ ...success });
    } else {
      res
        .status(400)
        .json({ ...details, errors: "Failed to create the game instance." });
    }
  } catch (err) {
    res
      .status(400)
      .json({ ...details, errors: "Failed to create the game instance." });
  }
});

export const updateGameInstance = asyncHandler(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ errors: "Not a valid ObjectId." });
  }

  let details = {};

  if (req.body.game) {
    details["game"] = req.body.game;
  }

  if (req.body.status) {
    details["status"] = req.body.status;
  }

  if (req.body.due_back) {
    details["due_back"] = req.body.due_back;
  }

  try {
    const gameInstance = await GameInstanceModel.findOneAndUpdate(
      { _id: req.params.id },
      details
    );
    if (gameInstance) {
      res.status(200).json(gameInstance);
    } else {
      res.status(404).json({ ...details, errors: "GameInstance not found." });
    }
  } catch (err) {
    res.status(400).json({ ...details, errors: err.errors });
  }
});

export const deleteGameInstance = asyncHandler(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ errors: "Not an ObjectId." });
  }

  try {
    const response = await GameInstanceModel.findOneAndRemove({
      _id: req.params.id,
    });

    if (response) {
      res.status(200).send("deleted");
    } else {
      res.status(404).json({ errors: "ID not found." });
    }
  } catch (err) {
    res.status(400).json({ errors: err });
  }
});

export const getGameInstancesList = asyncHandler(async (req, res, next) => {
  try {
    const response = await GameInstanceModel.find({}).lean().exec();

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ errors: "GameInstances list not found." });
    }
  } catch (err) {
    res.status(400).json({ errors: err });
  }
});

export const getGameInstancesByGameId = asyncHandler(async (req, res, next) => {

  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ errors: "Not a valid ObjectId." });
  }

  try {
    const response = await GameInstanceModel.find({game: req.params.id}).lean().exec();

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ errors: "GameInstances list not found." });
    }
  } catch (err) {
    res.status(400).json({ errors: err });
  }
});
