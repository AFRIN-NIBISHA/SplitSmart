const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const Expense = require('../models/Expense');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
    const { name, members } = req.body;
    try {
        const group = new Group({ name, members });
        await group.save();
        res.status(201).json(group);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id/expenses', authMiddleware, async (req, res) => {
    try {
        const expenses = await Expense.find({ groupId: req.params.id }).populate('paidBy splits.userId');
        res.json(expenses);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id/balances', authMiddleware, async (req, res) => {
    try {
        const expenses = await Expense.find({ groupId: req.params.id });
        const balances = {};
        expenses.forEach(exp => {
            exp.splits.forEach(split => {
                if(!balances[split.userId]) balances[split.userId] = 0;
                balances[split.userId] += split.share;
            });
            balances[exp.paidBy] -= exp.amount;
        });
        res.json(balances);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
