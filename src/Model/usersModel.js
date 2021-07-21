const mongoose = require('mongoose');
// Setup schema
const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    favourites: Array,
    admin: Boolean,
    create_date: {
        type: Date,
        default: Date.now
    }
});
const Users = module.exports = mongoose.model('users', usersSchema);
module.exports.get = function (callback, limit) {
    Users.find(callback).limit(limit);
}