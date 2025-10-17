const express = require('express');
const router = express.Router();
const borrowingController = require('../controllers/borrowingController');

router.get('/:userId', borrowingController.getAllBorrowings);
router.post('/borrow', borrowingController.createBorrowing);
router.put('/:id/return', borrowingController.returnBook);

module.exports = router;
