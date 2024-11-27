const bookingModel = require('../models/bookingModel.js');
const bookModel = require('../models/bookingModel.js');
const createBookController = async (req, res) => {
    try {
        const { user, travelpackage, payment, status, startdate, enddate } = req.body

        if (!user || !travelpackage || !payment || !status || !startdate || !enddate) {
            return res.status(500).send({
                success: false,
                message: 'please provide all fields'
            })
        }
        // Validate startdate
        const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
        const formattedStartDate = new Date(startdate).toISOString().split("T")[0];

        if (formattedStartDate == currentDate) {
            return res.status(400).send({
                success: false,
                message: "Start date must match not the current date",
            });
        }

        const newBook = new bookModel({ user, travelpackage, payment, status, startdate, enddate });

        await newBook.save();
        res.status(200).send({
            success: true,
            message: 'booking is created successfully'

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'provide all fields', error
        })

    }
}



//update
const updateBookController = async (req, res) => {
    try {
        const book = await bookingModel.findById(req.body.id)
        console.log(book);
        if (!book) {
            return res.status(404).send({
                success: false,
                message: 'booking Id is Not found'
            })
        }

        //update 
        const { startdate, enddate } = req.body;
        if (startdate) book.startdate = startdate
        if (enddate) book.enddate = enddate
        await book.save();
        res.status(201).send({
            success: true,
            message: 'booking is updated successfully'
        })
        // Validate startdate
        const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
        const formattedStartDate = new Date(startdate).toISOString().split("T")[0];

        if (formattedStartDate == currentDate) {
            return res.status(400).send({
                success: false,
                message: "Start date must not match the current date",
            });
        }


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in updating', error
        })
    }

}




module.exports = { createBookController, updateBookController }