"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.UserSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a first name'
    },
    username: {
        type: String,
        required: 'Enter a user name'
    },
    email: {
        type: String
    },
    id: {
        type: Number, ref: 'posts'
    },
    website: {
        type: String
    },
    address: {
        type: Array
    },
    company: {
        type: Array
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=usersModel.js.map