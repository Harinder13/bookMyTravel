const JWT = require('jsonwebtoken');
module.exports = async (req, res, next) => {
    try {
        //get token
        const token = req.headers["authorization"].split(" ")[1];
        console.log(token);

        console.log(process.env.JWT_SECRET);

        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                console.log(err);

                return res.status(401).send({

                    message: 'unauthorised user'
                })
            } else {
                req.adminid = decode.id;
                next();
            }
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Auth Api', error
        });

    }
}

