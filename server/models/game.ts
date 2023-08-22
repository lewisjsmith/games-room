import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    title: {
        type: String, required: true, minLength: 1, maxLength: 100
    }, 
    studio: {
        type: Schema.Types.ObjectId, required: true, ref: "studio"
    },
    genre: {
        type: Schema.Types.ObjectId, required: true, ref: "genre"
    },
    releaseDate: {
        type: Date
    }
})

GameSchema.virtual("url").get(function () {
    return `/library/game/${this._id}`;
});

const Game = mongoose.model<IGame>("game", GameSchema);
export default Game;

interface IGame extends mongoose.Document {
    title: String,
    studio: mongoose.Schema.Types.ObjectId,
    genre: mongoose.Schema.Types.ObjectId,
    releaseDate: Date
}


