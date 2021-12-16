// Import mongoose
const mongoose = require("mongoose");

// Import bcryptjs - for password hashing
const bcrypt = require('bcryptjs');

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance for User and add properties
const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user',
    },
    favs: {
      type: Array,
      default: []
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

//Create a Schema method to compare password
UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.hash_password);
}

UserSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// Create and export User model
module.exports = mongoose.model("User", UserSchema);
