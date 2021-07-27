Users = require('../Model/usersModel');

exports.index = function (req, res) {
    Users.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};

exports.getFavourites = function (req, res) {
    Users.findOne({email: req.params.userEmail}, function (err, user) {
        if (err)
            res.send(err);
        if(user) {
            res.send(
                user.favourites
            );
        } else {
            res.send([])
        }
    });
}

exports.getTopFavourites = function (req, res) {
    Users.get(function (err, users) {
        if (err)
            res.send(err);
        if(users) {
            let allFavourites = [];
            users.map(user => {
                user.favourites.map(favourite => {
                    allFavourites.push(favourite)
                })
            })
            function mode(arr){
                return arr.sort((a,b) =>
                    arr.filter(v => v===b).length
                    - arr.filter(v => v===a).length
                );
            }
            let uniq = a => [...new Set(a)];
            allFavourites = mode(allFavourites);
            allFavourites = uniq(allFavourites);
            res.send(
                allFavourites
            );
        } else {
            res.send([])
        }
    });
}

exports.updateFavourites = function (req, res) {
    Users.findOne({email: req.params.userEmail}, function (err, user) {
        if (err)
            res.send(err);
        user.favourites = user.favourites.filter(unfavourite => unfavourite !== req.body.unfavourite_id)
        user.save(function (err) {
            if (err) {
                res.json(err);
                return
            }
            res.send('favourite list updated')
        });
    });
}

exports.new = function (req, res) {
    Users.findOne({email: req.params.userEmail}, function (err, user) {
        if (err)
            res.send(err);
        if(user) {
            user.favourites.push(req.body.favourite);
            user.save(function (err) {
                if (err) {
                    res.json(err);
                    return
                }
            res.json({
                    message: 'User Favourite List Updated!',
                    data: user
                });
            });
        } else {
            const users = new Users();
            users.name = req.body.name
            users.email = req.body.email
            users.favourites = [req.body.favourite]
            users.save(function (err) {
                if (err) {
                    res.json(err);
                    return
                }
            res.json({
                    message: 'New user created!',
                    data: users
                });
            });
        }
    });
};

exports.deleteAll = function (req, res) {
    Users.remove(function (err) {
        if (err) {
            res.send(err);
            return
        }
        res.json({
            status: "success",
            message: 'users deleted'
        });
    });
};

