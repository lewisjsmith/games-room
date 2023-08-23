"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var StudioSchema = new Schema({
    title: {
        type: String, required: true, minLength: 1, maxLength: 100
    },
    founded: {
        type: Date
    }
});
StudioSchema.virtual("url").get(function () {
    return "/library/studio/".concat(this._id);
});
var Studio = mongoose_1.default.model("Studio", StudioSchema);
exports.default = Studio;
