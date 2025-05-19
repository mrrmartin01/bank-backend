const express = require('express');
const router = express.Router();
const { createTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createTransaction);

module.exports = router;
