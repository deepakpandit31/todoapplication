const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const todoSchema = new Schema({
    title: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },

}, { timestamps: true })
module.exports = mongoose.model("ToDo", todoSchema)
