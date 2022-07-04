const express = require('express');
const homeController = require('../controllers/homeController')
const router = express.Router();

router.get('/',homeController.home)
router.get('/cart',homeController.cart)
router.use('/items',require('./items'))
module.exports = router;