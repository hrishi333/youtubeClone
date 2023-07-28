// Comment Model

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
        userId: {
            type: Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        videoId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        edited: {
            type: Boolean,
            default: false,
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Comment", CommentSchema);