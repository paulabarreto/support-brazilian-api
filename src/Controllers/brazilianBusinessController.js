var fs = require('fs');

// Import contact model
Business = require('../Model/brazilianBusinessModel');
// Handle index actions
exports.index = function (req, res) {
    const skip = (req.params.page - 1) * 5;
    Business.find({}).sort('-likes').limit(5).skip(skip).exec(function(err, docs) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Business retrieved successfully",
            data: docs
        });
    });
};

exports.getBusinessAmount = function (req, res) {
    Business.count({}).exec(function(err, docs) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Number of Business retrieved successfully",
            data: docs
        });
    });
};

exports.findByCategory = function (req, res) {
    const skip = (req.params.page - 1) * 5;
    Business.find({category: req.params.category }).limit(5).skip(skip).exec(function(err, docs) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Business retrieved successfully",
            data: docs
        });
    });
};

exports.findByName = function (req, res) {
    const skip = (req.params.page - 1) * 5;
    const value = req.params.name;
    let query = {name: { $regex: '.*' + value + '.*', $options: 'i' }};
    Business.find(query).limit(5).skip(skip).exec(function(err, docs) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Business retrieved successfully",
            data: docs
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