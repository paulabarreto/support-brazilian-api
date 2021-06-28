var fs = require('fs');

// Import contact model
Business = require('../Model/brazilianBusinessModel');
// Handle index actions
exports.index = function (req, res) {
    Business.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Business retrieved successfully",
            data: contacts
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    var business = new Business();
    business.image.data = fs.readFileSync('./sb.png');
    business.image.contentType = 'image/png';
    business.name = req.body.name ? req.body.name : business.name;
    business.website = req.body.website;
    business.instagram = req.body.instagram;
    business.address = req.body.address;
// save the business and check for errors
    business.save(function (err) {
        if (err) {
            res.json(err);
            return
        }
res.json({
            message: 'New business created!',
            data: business
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Business.findById(req.params.business_id, function (err, business) {
        if (err)
            res.send(err);
        res.json({
            message: 'Business details loading..',
            data: business
        });
    });
};
// Handle update business info
exports.update = function (req, res) {
Business.findById(req.params.business_id, function (err, business) {
        if (err)
            res.send(err);
business.name = req.body.name ? req.body.name : business.name;
        business.website = req.body.website;
        business.instagram = req.body.instagram;
        business.address = req.body.address;
// save the business and check for errors
        business.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Business Info updated',
                data: business
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Business.remove({
        _id: req.params.business_id
    }, function (err) {
        if (err) {
            res.send(err);
            return
        }
res.json({
            status: "success",
            message: 'business deleted'
        });
    });
};
exports.deleteAll = function (req, res) {
    Business.remove(function (err) {
        if (err) {
            res.send(err);
            return
        }
res.json({
            status: "success",
            message: 'business deleted'
        });
    });
};