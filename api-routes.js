var fs = require('fs');

// Initialize express router
let router = require('express').Router();
Business = require('./Model/brazilianBusinessModel');

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("image");

router.post('/brazilianBusiness/:business_id', function(req, res) {
    upload(req, res, function (err) {
        Business.findById(req.params.business_id, function (err, business) {
            if (err)
                res.send(err);
            business.image = req.file ? {
                data: fs.readFileSync(path.join('./public/uploads/' + req.file.filename)),
                contentType: 'image/png'
            } : business.image;
            business.name = req.body.name ? req.body.name : business.name;
            business.description = req.body.description ? req.body.description : business.description;
            business.location = req.body.location ? req.body.location : business.location;
            business.website = req.body.website ? req.body.website : business.website;
            business.instagram = req.body.instagram ? req.body.instagram : business.instagram;
            business.address = req.body.address ? req.body.address : business.address;
            business.category = req.body.category ? req.body.category : business.category;
            business.adminApproved = req.body.adminApproved ? req.body.adminApproved : business.adminApproved;
            business.save(function (err) {
                if (err) {
                    res.json(err);
                } else {
                    res.json({
                        message: 'Business Info updated',
                        data: business
                    });
                }
            });
        });

    })
})

router.post('/newBusiness', function (req, res) {
    upload(req, res, function (err) {
        var business = new Business();
        business.image = {
            data: fs.readFileSync(path.join('./public/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
        business.name = req.body.name;
        business.description = req.body.description;
        business.location = req.body.location;
        business.website = req.body.website;
        business.instagram = req.body.instagram;
        business.category = req.body.category;
        business.address = req.body.address;
        business.adminApproved = req.body.adminApproved;
        business.created_by = req.body.createdBy;
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
    })
})

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

const usersController = require('./Controllers/usersController');
router.route('/users/:userEmail')
    .get(usersController.getFavourites)
    .put(usersController.updateFavourites)
    .post(usersController.new)
router.route('/users')
    .get(usersController.index)
    .delete(usersController.deleteAll); //! danger zone

// Import contact controller
const brazilianBusinessController = require('./Controllers/brazilianBusinessController');
router.route('/brazilianBusiness')
    .get(brazilianBusinessController.index)
    // .post(brazilianBusinessController.new);
router.route('/brazilianBusiness/:business_id')
    // .get(brazilianBusinessController.view)
    // .patch(brazilianBusinessController.update)
    // .put(brazilianBusinessController.update)
    .delete(brazilianBusinessController.delete);
    // .delete(brazilianBusinessController.deleteAll);
// Export API routes
module.exports = router;