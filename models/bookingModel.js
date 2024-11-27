const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },

    travelpackage: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Travel'
    },
    payment: {
        type: String,
        enum: ['credit card', 'debit card', 'apple pay']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled']
    },
    startdate: {
        type: Date
    },
    enddate: {
        type: Date
    }


});
module.exports = mongoose.model('Book', bookSchema)