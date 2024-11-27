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








module.exports = { getUserController }