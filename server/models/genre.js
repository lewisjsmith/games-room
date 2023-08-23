"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var GenreSchema = new Schema({
    title: {
        type: String, required: true, minLength: 1, maxLength: 100
    }
});
GenreSchema.virtual("url").get(function () {
    return "/library/genre/".concat(this._id);
});
var Genre = mongoose_1.default.model("genre", GenreSchema);
exports.default = Genre;
