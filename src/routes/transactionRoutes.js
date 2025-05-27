const express = require('express');
const router = express.Router();
const { createTransaction, getTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, createTransaction);
router.get('/', protect, getTransaction);

module.exports = router;
