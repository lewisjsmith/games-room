import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const GameInstanceSchema = new Schema({
    game: {
        type: Schema.Types.ObjectId, required: true, ref: "game"
    },
    status: {
        type: String, enum: ["Available", "Loaned", "Lost"]
    }, 
    due_back: {
        type: Date
    }
})

GameInstanceSchema.virtual("url").get(function () {
    return `/library/gameinstance/${this._id}`;
});

const GameInstance = mongoose.model<IGameInstance>("GameInstance", GameInstanceSchema);
export default GameInstance;

interface IGameInstance extends mongoose.Document {
    game: mongoose.Schema.Types.ObjectId,
    status: String,
    due_back: Date
}