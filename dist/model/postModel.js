"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.PostSchema = new Schema({
    title: {
        type: String,
        required: 'Enter a title'
    },
    body: {
        type: String,
        required: 'Enter a body'
    },
    userId: {
        type: Number, ref: 'users'
    },
    id: {
        type: Number
    },
    comments: {
        type: Array
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=postModel.js.map