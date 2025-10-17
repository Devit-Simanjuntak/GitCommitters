const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/getAlls', bookController.getAllBooks);
// router.put('/:id', bookController.updateBook);

module.exports = router;
