var fs = require('fs');

// Import contact model
Business = require('../Model/brazilianBusinessModel');
// Handle index actions
exports.index = function (req, res) {
    const pageNumber = req.params.page
    const skip = (req.params.page - 1) * 6;
    Business.find({}).limit(6).skip(skip).exec(function(err, docs) {
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

exports.findFavourites = function (req, res) {
    Business.find({'_id': {$in: req.query.ids}}).sort('-likes').exec(function(err, docs) {
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
    const value = req.params.value === '0' ? '' : req.params.value;
    if(!value) {
        Business.countDocuments({}).exec(function(err, docs) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
                return
            }
            res.json({
                status: "success",
                message: "Number of Business retrieved successfully",
                data: docs
            });
        });
    } else {
        Business.countDocuments({[req.params.filterBy]: value}).exec(function(err, docs) {
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
    }
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

exports.findCoordinates = function (req, res) {
    Business.find({}, ['name', 'website', 'lat', 'lng'],).exec(function(err, docs) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Coordinates retrieved successfully",
            data: docs
        });
    });
}

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