import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    title: {
        type: String, required: true, minLength: 1, maxLength: 100
    }
})

GenreSchema.virtual("url").get(function() {
    return `/library/genre/${this._id}`;
});

const Genre = mongoose.model<IGenre>("genre", GenreSchema);
export default Genre;

interface IGenre extends mongoose.Document {
    title: String
}

