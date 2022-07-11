const express = require('express');
const homeController = require('../controllers/homeController')
const router = express.Router();

router.use('/v1',require('./v1'));
router.use('/items',require('./items'))


router.get('/',homeController.home)
router.get('/add2cart',homeController.add2cart)
router.get('/cart',homeController.cart)
router.post('/checkout',homeController.checkout);

module.exports = router;