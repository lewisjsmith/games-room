import GameModel from "../models/game";
import GameInstanceModel from "../models/gameInstance";
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

export const updateGame = asyncHandler(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ errors: "Not a valid ObjectId." });
  }

  let details: GameBody = {};

  if (req.body.title) {
    if (req.body.title.trim() !== "") {
      details["title"] = req.body.title;
    }
  }
  if (req.body.studio) {
    details["studio"] = req.body.studio;
  }
  if (req.body.genre) {
    details["genre"] = req.body.genre;
  }
  if (req.body.releaseDate) {
    details["releaseDate"] = req.body.releaseDate;
  }

  if (Object.keys(details).length > 0) {
    const gameExists = await GameModel.findOne({
      title: req.body.title.trim(),
    });

    const game = await GameModel.findOne({
      _id: req.params.id,
    });

    if (gameExists) {
      if (game) {
        if (game._id.toHexString() !== gameExists._id.toHexString()) {
          res.status(400).json({ ...gameExists, errors: "Name in use." });
        } else {
          for (const key in details) {
            game[key] = details[key];
            game.markModified(key);
          }
          await game.save();
          res.status(200).json({ ...game });
        }
      } else {
        res.status(404).json({ ...details, errors: "Game not found." });
      }
    } else {
      if (game) {
        for (const key in details) {
          game[key] = details[key];
          game.markModified(key);
        }
        await game.save();
        res.status(200).json({ ...game });
      } else {
        res.status(404).json({ ...details, errors: "Game not found." });
      }
    }
  } else {
    res.status(400).json({ errors: "No changes requested." });
  }
});

export const deleteGame = asyncHandler(async (req, res, next) => {

  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ errors: "Not an ObjectId." });
    return;
  }

  try {
    const instances = await GameInstanceModel.find({game: req.params.id});
    if(instances.length > 0) {
      res.status(400).json({errors: "Game can't be deleted whilst it has Game Instances."});
      return;
    }
  } catch (err) {
    console.log(err)
  }

  try {
    const response = await GameModel.findOneAndRemove({ _id: req.params.id });

    if (response) {
      res.status(200).send("deleted");
    } else {
      res.status(404).json({ errors: "ID not found." });
      return;
    }
  } catch (err) {
    res.status(400).json({ errors: err });
    return;
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
  title?: string;
  studio?: mongoose.Types.ObjectId;
  genre?: mongoose.Types.ObjectId;
  releaseDate?: Date;
}
