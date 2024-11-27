const adminModel = require('../models/adminModel.js');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const regAdminController = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newAdmin = new adminModel({ username, email, password: hashedPassword, phone });
        await newAdmin.save();
        res.status(200).send({
            success: true,
            message: 'registered successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in registering admin', error
        })
    }
}


const loginAdminController = async (req, res) => {
    try {
        const { username, password } = req.body
        const admin = await adminModel.findOne({ username });
        if (!admin) {
            return res.status(404).send({
                success: false,
                message: 'admin not found'
            })
        }
        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'invalid credential'
            })
        }
        const token = JWT.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
        res.status(200).send({
            success: false,
            message: 'login successfully',
            token,
            admin
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in login'
        })

    }
}

const getAdminController = async (req, res) => {
    try {
        const admin = await adminModel.findById({ _id: req.body.id })
        if (!admin) {
            return res.status(500).send({
                success: false,
                message: 'admin not found'
            })
        }
        admin.password = undefined
        res.status(200).send({
            success: true,
            message: 'admin found successfully', admin
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in get admin', error
        })

    }
}


const updateAdminController = async (req, res) => {
    try {
        const admin = await adminModel.findById({ _id: req.body.id })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in updating', error
        })

    }
}












module.exports = { regAdminController, loginAdminController, getAdminController, updateAdminController }