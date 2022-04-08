var fs = require('fs');
const checkUrl = require('./Services/checkUrl');


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
        if (err) {
            res.json(err)
            return
        }
        Business.findById(req.params.business_id, function (err, business) {
            if (err)
                res.send(err);
            business.image = req.file ? {
                data: fs.readFileSync(path.join('./public/uploads/' + req.file.filename)),
                contentType: 'image/png'
            } : business.image;
            
            // Add https to site
            let validatedWebsite;
            if(req.body.website) {
                validatedWebsite = checkUrl.validateURL(req.body.website)
            }
            business.name = req.body.name ? req.body.name : business.name;
            business.description = req.body.description ? req.body.description : business.description;
            business.location = req.body.location ? req.body.location : business.location;
            business.lat = req.body.lat ? req.body.lat : business.lat;
            business.lng = req.body.lng ? req.body.lng : business.lng;
            business.website = req.body.website ? validatedWebsite : business.website;
            business.instagram = req.body.instagram ? req.body.instagram : business.instagram;
            business.address = req.body.address ? req.body.address : business.address;
            business.category = req.body.category ? req.body.category : business.category;
            business.adminApproved = req.body.adminApproved ? req.body.adminApproved : business.adminApproved;
            business.editionRequestedBy = req.body.email ? req.body.email : '';
            business.deletionRequestedBy = req.body.email ? req.body.email : '';
            business.deletionRequested = req.body.deletionRequested ? req.body.deletionRequested : false;
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
        if (err) {
            res.json(err)
            return
        }
        var business = new Business();
        business.image = {
            data: fs.readFileSync(path.join('./public/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }

        // Add https to site
        let validatedWebsite;
        if(req.body.website) {
            validatedWebsite = checkUrl.validateURL(req.body.website)
        }

        business.name = req.body.name;
        business.description = req.body.description;
        business.location = req.body.location;
        business.lat = req.body.lat;
        business.lng = req.body.lng;
        business.website = validatedWebsite;
        business.instagram = req.body.instagram;
        business.category = req.body.category;
        business.likes = 0;
        business.address = req.body.address;
        business.adminApproved = req.body.adminApproved;
        business.created_by = req.body.createdBy;
        business.save(function (err) {
            if (err) {
                res.json(err);
                return
            }
        res.json({
                message: business,
                data: business
            });
        });
        
    })
})

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to Support Brazilian API!',
    });
});


const usersController = require('./Controllers/usersController');
router.route('/users/:userEmail')
    .get(usersController.getFavourites)
    .put(usersController.updateFavourites)
    .post(usersController.new)
router.route('/users')
    .get(usersController.index)
    // .delete(usersController.deleteAll); //! danger zone

const brazilianBusinessController = require('./Controllers/brazilianBusinessController');
router.route('/findMarkers')
    .get(brazilianBusinessController.findCoordinates)
router.route('/brazilianBusinessCount/:filterBy/:value')
    .get(brazilianBusinessController.getBusinessAmount)
router.route('/brazilianBusinessFavourites')
    .get(brazilianBusinessController.findFavourites)
router.route('/brazilianBusiness/admin')
    .get(brazilianBusinessController.adminRequests)
router.route('/brazilianBusiness/:page')
    .get(brazilianBusinessController.index)
router.route('/brazilianBusiness/:page/:category')
    .get(brazilianBusinessController.findByCategory)
router.route('/brazilianBusiness/:page/:category/:name')
    .get(brazilianBusinessController.findByName)
router.route('/brazilianBusiness/:business_id')
    .put(brazilianBusinessController.likeBusiness)
    .delete(brazilianBusinessController.delete);
    // .delete(brazilianBusinessController.deleteAll);
// Export API routes
module.exports = router;