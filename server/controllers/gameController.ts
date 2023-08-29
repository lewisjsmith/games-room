import GameModel from "../models/game";
import StudioModel from "../models/studio";
import GenreModel from "../models/genre";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";

// const placeholder = new Date();
// const offset = placeholder.getTimezoneOffset()/60;
// const d = new Date(1992, 9, 10, -offset)

export const gameIndex = asyncHandler(async (req, res, next) => {
  res.status(400).json({ errors: "Invalid URL." });
});

export const getGameById = asyncHandler(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ errors: "Not a valid ObjectId." });
  }

  try {
    const game = await GameModel.find({ _id: req.params.id })
      .select({ __v: 0 })
      .lean()
      .exec();

    if (game.length === 0) {
      res.status(404).json({ errors: "Game not found." });
    } else {
      res.status(200).json(game[0]);
    }
  } catch (err) {
    res.status(400).json({ errors: "Invalid URL." });
  }
});

export const createGame = [
  body("title", "Game title must contain at least 1 character")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {

    const errors = validationResult(req);

    const details = {
      title: req.body.title,
      studio: req.body.studio,
      genre: req.body.genre,
      releaseDate: req.body.releaseDate,
    };

    const game = new GameModel(details);

    if (!errors.isEmpty()) {
      res.status(400).json({ ...details, errors: errors.array() });
      return;
    } else {
      const gameExists = await GameModel.findOne({
        title: req.body.title,
      }).exec();

      if (gameExists) {
        res.status(302).json({
          _id: gameExists._id.toHexString(),
          ...details,
        });
      } else {
        await game.save();
        res.status(200).json({ _id: game._id.toHexString(), ...details });
      }
    }
  }),
];

export const updateGame = [
  body("title", "Game title must contain at least 1 character")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).json({ errors: "Not a valid ObjectId." });
    }

    const errors = validationResult(req);

    const details = {
      title: req.body.title,
      studio: req.body.studio,
      genre: req.body.genre,
      releaseDate: req.body.releaseDate,
    };

    if (!errors.isEmpty()) {
      res.status(400).json({ ...details, errors: errors.array() });
      return;
    } else {
      const gameExists = await GameModel.findOne({
        title: req.body.title,
      }).exec();

      if (gameExists) {
        res.status(302).json({
          _id: gameExists._id.toHexString(),
          ...details,
        });
      } else {
        const game = await GameModel.findOneAndUpdate(
          { _id: req.params.id },
          details
        );

        if (game) {
          res.status(200).json({ title: details.title, ...game });
        } else {
          res.status(404).json({ ...details });
        }
      }
    }
  }),
];

export const updateGameOld = asyncHandler(async (req, res, next) => {
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
    const response = await StudioModel.find({ title: body.studio })
      .select({ _id: 1 })
      .lean()
      .exec();

    return response[0]["_id"];
  }

  async function getGenreId() {
    const response = await GenreModel.find({ title: body.genre })
      .select({ _id: 1 })
      .lean()
      .exec();

    return response[0]["_id"];
  }

  if (
    Object.keys(body).includes("studio") &&
    !Object.keys(body).includes("genre")
  ) {
    const studio = await getStudioId();
    body.studio = studio;

    try {
      const response = await GameModel.findOneAndUpdate(
        { _id: req.params.id },
        body
      );
      res.status(200).json({ _id: req.params.id });
    } catch (err) {
      res.status(400).json(err);
    }
  }

  if (
    !Object.keys(body).includes("studio") &&
    Object.keys(body).includes("genre")
  ) {
    const genre = await getGenreId();
    body.genre = genre;

    try {
      const response = await GameModel.findOneAndUpdate(
        { _id: req.params.id },
        body
      );
      res.status(200).json({ _id: req.params.id });
    } catch (err) {
      res.status(400).json(err);
    }
  }

  if (
    Object.keys(body).includes("studio") &&
    Object.keys(body).includes("genre")
  ) {
    const studio = await getStudioId();
    const genre = await getGenreId();

    Promise.all([studio, genre]).then(async (values) => {
      body.studio = values[0];
      body.genre = values[1];

      try {
        const response = await GameModel.findOneAndUpdate(
          { _id: req.params.id },
          body
        );
        res.status(200).json({ _id: req.params.id });
      } catch (err) {
        res.status(400).json(err);
      }
    });
  }

  if (
    !Object.keys(body).includes("studio") &&
    !Object.keys(body).includes("genre")
  ) {
    try {
      const response = await GameModel.findOneAndUpdate(
        { _id: req.params.id },
        body
      );
      if (response) {
        res.status(200).json({ _id: req.params.id });
      } else {
        res.status(400).json({ errors: "Invalid ID." });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
});

export const deleteGame = asyncHandler(async (req, res, next) => {

  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ errors: "Not an ObjectId." });
  }

  try {
    const response = await GameModel.findOneAndRemove({ _id: req.params.id });

    if (response) {
      res.status(200).send("deleted");
    } else {
      res.status(404).json({ errors: "ID not found." });
    }
  } catch (err) {
    res.status(400).json({ errors: err });
  }
});

export const getGamesList = asyncHandler(async (req, res, next) => {
  try {
    const response = await GameModel.find({}).lean().exec();

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
  title: string;
  studio: mongoose.Types.ObjectId;
  genre: mongoose.Types.ObjectId;
  releaseDate: Date;
}

interface UpdateBody {
  title?: string;
  studio?: mongoose.Types.ObjectId;
  genre?: mongoose.Types.ObjectId;
  releaseDate?: Date;
}
