const userModel = require('../models/userModel.js')
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { sendMail } = require('../helpers/sendMail.js');


const getUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'user not found'
            })
        }
        //hide password
        user.password = undefined
        res.status(200).send({
            success: true,
            message: 'user is found', user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in get user', error
        })

    }
}



// Register User Controller
const registerUserController = async (req, res) => {
    try {
        const { username, password, email, phone } = req.body;

        // Validate required fields
        if (!username || !email || !password || !phone) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields'
            });
        }

        // Check if user already exists
        // const existing = await userModel.findOne({ email });
        // if (existing) {
        //     return res.status(400).send({
        //         success: false,
        //         message: 'Email already registered'
        //     });


        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await userModel.create({
            username,
            email,
            phone,
            password: hashedPassword
        });

        // Send welcome email
        await sendMail(user.email, "Welcome to BookingTravel", "Hi, Thank you for registering with us!");

        // Response to client
        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        });

    } catch (error) {
        console.error('Error in registerUserController:', error);
        res.status(500).send({
            success: false,
            message: 'Error in registering user',
            error
        });
    }
};









module.exports = { getUserController, registerUserController }