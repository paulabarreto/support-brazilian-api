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

exports.likeBusiness = function(req, res) {
    Business.findById({_id: req.params.business_id}, function (err, business) {
        if (err)
            res.send(err);
        if(business) {
            if(business.likes) {
                business.likes = req.body.like ?
                                    business.likes + 1 :
                                    business.likes -1;
            } else {
                business.likes = 1
            }
            business.save(function (err) {
                if (err) {
                    res.json(err);
                    return
                }
            res.json({
                    message: 'businessUpdated!',
                    data: business
                });
            });
        }
    })
}

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