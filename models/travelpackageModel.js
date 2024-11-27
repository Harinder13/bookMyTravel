const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Admin'
    },

    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    numberofpeople: {
        type: String
    },
    startdate: {
        type: Date

    },
    enddate: {
        type: Date
    },
    totalcost: {
        type: Number
    },
    availableSlots: {
        type: Number,
        default: 0
    },
    countries: {
        type: [String],
        enum: ['singapore', 'dubai', 'Honkog', 'Bali', 'Malaysia']
    },
    duration: {
        type: Number,
        min: [3, 'duration must be atleast 3 day'],

        validation: {
            validator: Number.isInteger,
            message: 'duration must be integer'

        }
    }
});


module.exports = mongoose.model('Travel', travelSchema)