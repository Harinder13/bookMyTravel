const userModel = require('../models/userModel.js')
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const { username, password, email, phone } = req.body;

        if (!username || !email || !password || !phone) {
            return res.status(500).send({
                success: false,
                message: 'please provide all fields'
            })
        }
        //check user
        const existing = await userModel.findOne({ email: email })
        console.log("existing", existing)
        if (existing) {
            return res.status(500).send({
                suucess: false,
                message: 'Email already registered'
            });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)


        //create new user
        const user = await userModel.create({
            username, email, phone, password: hashedPassword
        })
        user.save();

        res.status(201).send({
            success: true,
            message: 'successfully registered'
        });




    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in register', error
        })

    }
}



const loginController = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(500).send({
                success: false,
                message: 'please provide all fields'
            })
        }
        const user = await userModel.findOne({ username })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: 'user is not found'
            })

        }
        //check password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: 'invalid credential'
            })
        }
        //token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
        res.status(200).send({
            success: true,
            message: 'login successfully',
            token,
            user
        })



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'eror in login ', error
        })

    }
}





module.exports = { registerController, loginController }