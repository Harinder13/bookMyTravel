const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    status: {
        type: String,
        enum: ['successful', 'pending', 'failed']
    },
    paymentMethod: {
        type: String,
        enum: ['credit card', 'debot card', 'Apple pay']
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }


});
module.exports = mongoose.model('Payment', paymentSchema)
