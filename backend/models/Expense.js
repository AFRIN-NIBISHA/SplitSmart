const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    splits: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, share: Number }],
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Expense', expenseSchema);
