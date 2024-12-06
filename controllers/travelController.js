const travelpackageModel = require("../models/travelpackageModel")
const cloudinary = require('cloudinary').v2;


const createTravelController = async (req, res) => {
    try {
        const admin = req.adminid
        const { origin, destination, duration } = req.body
        const imagepath = req.file ? req.file.path : null
        if (!origin || !destination || !duration) {
            return res.status(500).send({
                success: false,
                message: 'travelpackage is not created'
            })
        }

        const newTravel = new travelpackageModel({ origin, destination, admin, duration });
        await newTravel.save();
        res.status(200).send({
            success: true,
            message: 'package created successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in creating package', error
        })

    }

}


const updateTravelController = async (req, res) => {
    try {
        const travel = await travelpackageModel.findById(req.body.id)
        console.log(req.body.id);

        console.log(travel);

        if (!travel) {
            return res.status(404).send({
                success: false,
                message: 'travelId is not found'
            })
        }
        //update
        const { countries, duration } = req.body
        if (countries) travel.countries = countries
        if (duration) travel.duration = duration
        await travel.save();
        res.status(200).send({
            success: true,
            message: 'updated successfully'

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in update', error
        })
    }

}

//Delete
const deleteTravelController = async (req, res) => {
    try {

        await travelpackageModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            message: 'deleted successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in delete', error
        })

    }
}



module.exports = { createTravelController, updateTravelController, deleteTravelController }