import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    title: {
        type: String, required: true, minLength: 1, maxLength: 100
    }, 
    studio: {
        type: Schema.Types.ObjectId, required: true, ref: "Studio"
    },
    genre: {
        type: Schema.Types.ObjectId, required: true, ref: "Genre"
    },
    console: {
        type: Schema.Types.ObjectId, required: true, ref: "Console"
    },
    releaseDate: {
        type: Date
    }
})

GameSchema.virtual("url").get(function () {
    return `/library/game/${this._id}`;
});

export const GameModel = mongoose.model("Game", GameSchema);


