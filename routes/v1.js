const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/profile',paymentController.profile);
router.post('/payments',paymentController.payments);
// console.log('i am here');
module.exports = router;