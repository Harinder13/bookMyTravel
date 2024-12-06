const mongoose = require('mongoose');

const travelSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number

    },
    paymentMethod: {
        type: String,
        enum: ['debit card', 'credit card', 'apple pay']
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid', 'refunded']

    },
    image: {
        type: String, // Store image as a URL

    }

});
module.exports = mongoose.model('Travel', travelSchema);