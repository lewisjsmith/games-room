"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var GameInstanceSchema = new Schema({
    game: {
        type: Schema.Types.ObjectId, required: true, ref: "game"
    },
    status: {
        type: String, enum: ["Available", "Loaned", "Lost"]
    },
    due_back: {
        type: Date
    }
});
GameInstanceSchema.virtual("url").get(function () {
    return "/library/gameinstance/".concat(this._id);
});
var GameInstance = mongoose_1.default.model("GameInstance", GameInstanceSchema);
exports.default = GameInstance;
