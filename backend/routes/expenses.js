const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:groupId', authMiddleware, async (req, res) => {
    const { description, amount, paidBy, splits } = req.body;
    try {
        const expense = new Expense({ groupId: req.params.groupId, description, amount, paidBy, splits });
        await expense.save();
        res.status(201).json(expense);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
