import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
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
    id:{
      type: Number, ref: 'posts'
    },
    website: {
        type: String
    },
    address:{
      type: Array
    },
    company:{
      type: Array
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
