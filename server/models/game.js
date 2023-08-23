"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var GameSchema = new Schema({
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
});
GameSchema.virtual("url").get(function () {
    return "/library/game/".concat(this._id);
});
var Game = mongoose_1.default.model("game", GameSchema);
exports.default = Game;
