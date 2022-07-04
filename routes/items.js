const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
router.get('/add',itemsController.add);
router.post('/addItem',itemsController.addItem);
module.exports = router;