var mongoose = require('mongoose');
// Setup schema
var businessSchema = mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    location: String,
    website: String,
    instagram: String,
    address: String,
    category: Number,
    adminApproved: Boolean,
    created_by: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Business model
var Business = module.exports = mongoose.model('business', businessSchema);
module.exports.get = function (callback, limit) {
    Business.find(callback).limit(limit);
}