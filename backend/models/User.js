const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
}, { timestamps: true });

// Password hashing
userSchema.pre('save', async function(next) {
    if(!this.isModified('passwordHash')) return next();
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);
