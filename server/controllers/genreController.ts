import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import GameModel from "../models/game";
import GenreModel from "../models/genre";
import mongoose from "mongoose";

export const genreIndex = asyncHandler(async (req, res, next) => {
  res.status(400).json({ errors: "Invalid URL." });
});

export const getGenreById = asyncHandler(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ errors: "Not a valid ObjectId." });
  }

  try {
    const genre = await GenreModel.findOne({ _id: req.params.id })
      .select({ __v: 0 })
      .lean()
      .exec();

    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(404).json({ errors: "Genre not found." });
    }
  } catch (err) {
    res.status(400).json({ errors: "Invalid URL." });
  }
});

export const createGenre = [
  body("title", "Genre title must contain at least 1 character")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const details = {
      title: req.body.title,
    };

    const genre = new GenreModel(details);

    if (!errors.isEmpty()) {
      res.status(400).json({ ...details, errors: errors.array() });
      return;
    } else {
      const genreExists = await GenreModel.findOne({
        title: req.body.title,
      }).exec();

      if (genreExists) {
        res.status(302).json({
          _id: genreExists._id.toHexString(),
          ...details,
        });
      } else {
        await genre.save();
        res.status(200).json({ _id: genre._id.toHexString(), ...details });
      }
    }
  }),
];

export const updateGenre = asyncHandler(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ errors: "Not a valid ObjectId." });
  }

  let details = {};

  if (req.body.title) {
    if (req.body.title.trim() !== "") {
      details["title"] = req.body.title;
    }
  }

  if (Object.keys(details).length > 0) {
    let genreExists;

    if (req.body.title) {
      genreExists = await GenreModel.findOne({
        title: req.body.title.trim(),
      });
    }

    const genre = await GenreModel.findOne({
      _id: req.params.id,
    });

    if (genreExists) {
      if (genre) {
        if (genre._id.toHexString() !== genreExists._id.toHexString()) {
          res.status(400).json({ ...genreExists, errors: "Name in use." });
          return;
        } else {
          for (const key in details) {
            genre[key] = details[key];
            genre.markModified(key);
          }
          await genre.save();
          res.status(200).json({ ...genre });
        }
      } else {
        res.status(404).json({ ...details, errors: "Genre not found." });
        return;
      }
    } else {
      if (genre) {
        for (const key in details) {
          genre[key] = details[key];
          genre.markModified(key);
        }
        await genre.save();
        res.status(200).json({ ...genre });
      } else {
        res.status(404).json({ ...details, errors: "Genre not found." });
        return;
      }
    }
  } else {
    res.status(400).json({ errors: "No changes requested." });
    return;
  }
});

export const deleteGenre = asyncHandler(async (req, res, next) => {

  try {
    const instances = await GameModel.find({genre: req.params.id});
    if(instances.length > 0) {
      res.status(400).json({errors: "Genre can't be deleted whilst it has Game Instances."});
      return;
    }
  } catch (err) {
    console.log(err)
  }

  try {
    const response = await GenreModel.findOneAndRemove({ _id: req.params.id });

    if (response) {
      res.status(200).send("deleted");
    } else {
      res.status(400).json({ errors: "ID not found." });
      return;
    }
  } catch (err) {
    res.status(400).json({ errors: err.errors });
    return;
  }
});

export const getGenres = asyncHandler(async (req, res, next) => {
  const genres = await GenreModel.find({}).lean().exec();
  res.json(genres);
});
