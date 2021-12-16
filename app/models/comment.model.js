const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    hidden: {
        type: Boolean,
        default: false
    },
});

CommentSchema.method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Comment', CommentSchema);
