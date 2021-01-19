const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: 'Please enter an email address.'
    },
    password: {
        type: String,
        required: 'Please enter your password.'
    },
});
console.log(this); // {}
userSchema.pre('save', function (next)  {
    // if (!this.isModified('password')) return next()

    console.log(this); // {} (if arrow)

    const hashedPassword = bcrypt.hashSync(this.password, 10);
    console.log(hashedPassword);
    this.password = hashedPassword;

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
