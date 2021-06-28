// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import contact controller
const brazilianBusinessController = require('./Controllers/brazilianBusinessController');
// Contact routes
router.route('/brazilianBusiness')
    .get(brazilianBusinessController.index)
    .post(brazilianBusinessController.new);
router.route('/brazilianBusiness/:business_id')
    // .get(brazilianBusinessController.view)
    // .patch(brazilianBusinessController.update)
    // .put(brazilianBusinessController.update)
    .delete(brazilianBusinessController.delete);
// Export API routes
module.exports = router;