import asyncHandler from "express-async-handler";
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
    const genre = await GenreModel.find({ _id: req.params.id })
      .select({ __v: 0 })
      .lean()
      .exec();

    if (genre.length > 0) {
      res.status(200).json(genre[0]);
    } else {
      res.status(404).json({ errors: "Genre not found." });
    }
  } catch (err) {
    res.status(400).json({ errors: "Invalid URL." });
  }
});

export const createGenre = asyncHandler(async (req, res, next) => {
  const details = { title: req.body.title };

  const genre = new GenreModel(details);

  try {
    const response = await genre.save();
    res.status(200).json(response);
  } catch (err) {
    const keys = Object.keys(err.errors);
    const errorFields = keys.join(" and ");
    const errorBody = { errors: `Invalid input(s) for ${errorFields}` };
    res.status(400).json(errorBody);
  }
});

export const updateGenre = asyncHandler(async (req, res, next) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ errors: "Invalid ID format." });
        return;
    }

    const body = req.body;

    if (Object.keys(body).length === 0) {
        res.status(400).json({ errors: "No updates requested." });
        return;
    }

    if (Object.keys(body).includes("title") && body.title?.trim() === "") {
        res.status(400).json({ errors: "No input title." });
        return;
    }

    try {
        const response = await GenreModel
            .findOneAndUpdate({ "_id": req.params.id }, body);

        if (response === null) {
            res.status(404).json({ errors: "ID not found." })
        } else {
            res.status(200).json({ "_id": req.params.id });
        }

    } catch (err) {
        res.status(400).json({ errors: err.errors });
    }

    return;

});

// export const deleteStudio = asyncHandler(async (req, res, next) => {

//     try {
//         const response = await StudioModel
//             .findOneAndRemove({ "_id": req.params.id })

//         if (response) {
//             res.status(200).send("deleted");
//         } else {
//             res.status(400).json({ errors: "ID not found." });
//         }
//     } catch (err) {
//         res.status(400).json({errors: err.errors});
//     }

// });

export const getGenres = asyncHandler(async (req, res, next) => {
  const genres = await GenreModel.find({}).lean().exec();
  res.json(genres);
});
