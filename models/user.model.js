
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true,
        maxLength: [30]
    },
    phone: {
        type: String,
        required: true, 
        trim: true,
        maxLength: [10]
    },
    email: {
        type: String,
        required: true, 
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true, 
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/travelo/image/upload/v1622133397/avatar/avatar_cugq40.png'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);