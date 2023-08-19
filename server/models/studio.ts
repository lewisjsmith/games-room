import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StudioSchema = new Schema({
    title: {
        type: String, required: true, minLength: 1, maxLength: 100
    },
    founded: {
        type: Date
    }
})

StudioSchema.virtual("url").get(function() {
    return `/library/studio/${this._id}`;
});

module.exports = mongoose.model("Studio", StudioSchema);