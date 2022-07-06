const express = require('express');
const homeController = require('../controllers/homeController')
const router = express.Router();

router.get('/',homeController.home)
router.get('/add2cart',homeController.add2cart)
router.use('/items',require('./items'))
router.get('/cart',homeController.cart)
module.exports = router;