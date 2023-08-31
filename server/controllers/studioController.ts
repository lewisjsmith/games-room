import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import StudioModel from "../models/studio";
import mongoose from "mongoose";

export const studioIndex = asyncHandler(async (req, res, next) => {
  res.status(400).json({ errors: "Invalid URL." });
});

export const getStudioById = asyncHandler(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ errors: "Not a valid ObjectId." });
  }

  try {
    const studio = await StudioModel.findOne({ _id: req.params.id })
      .select({ __v: 0 })
      .lean()
      .exec();

    if (studio) {
      res.status(200).json(studio);
    } else {
      res.status(404).json({ errors: "Studio not found." });
    }
  } catch (err) {
    res.status(400).json({ errors: "Invalid URL." });
  }
});

export const createStudio = [
  body("title", "Studio title must contain at least 1 character")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const details = {
      title: req.body.title,
      founded: req.body.founded,
    };

    const studio = new StudioModel(details);

    if (!errors.isEmpty()) {
      res.status(400).json({ ...details, errors: errors.array() });
      return;
    } else {
      const studioExists = await StudioModel.findOne({
        title: req.body.title,
      }).exec();

      if (studioExists) {
        res.status(302).json({
          _id: studioExists._id.toHexString(),
          ...details,
        });
      } else {
        await studio.save();
        res.status(200).json({ _id: studio._id.toHexString(), ...details });
      }
    }
  }),
];

export const updateStudio = asyncHandler(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ errors: "Not a valid ObjectId." });
  }

  let details = {};

  if (req.body.title) {
    if (req.body.title.trim() !== "") {
      details["title"] = req.body.title;
    }
  }

  if (req.body.founded) {
    details["founded"] = req.body.founded;
  }

  if (Object.keys(details).length > 0) {
    let studioExists;

    if (req.body.title) {
      studioExists = await StudioModel.findOne({
        title: req.body.title.trim(),
      });
    }

    const studio = await StudioModel.findOne({
      _id: req.params.id,
    });

    if (studioExists) {
      if (studio) {
        if (studio._id.toHexString() !== studioExists._id.toHexString()) {
          res.status(400).json({ ...studioExists, errors: "Name in use." });
          return;
        } else {
          for (const key in details) {
            studio[key] = details[key];
            studio.markModified(key);
          }
          await studio.save();
          res.status(200).json({ ...studio });
        }
      } else {
        res.status(404).json({ ...details, errors: "Studio not found." });
        return;
      }
    } else {
      if (studio) {
        for (const key in details) {
          studio[key] = details[key];
          studio.markModified(key);
        }
        await studio.save();
        res.status(200).json({ ...studio });
      } else {
        res.status(404).json({ ...details, errors: "Studio not found." });
        return;
      }
    }
  } else {
    res.status(400).json({ errors: "No changes requested." });
    return;
  }
});

export const deleteStudio = asyncHandler(async (req, res, next) => {
  try {
    const response = await StudioModel.findOneAndRemove({ _id: req.params.id });

    if (response) {
      res.status(200).send("deleted");
    } else {
      res.status(400).json({ errors: "ID not found." });
    }
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
});

export const getStudios = asyncHandler(async (req, res, next) => {
  const studios = await StudioModel.find({}).lean().exec();
  res.status(200).json(studios);
});
