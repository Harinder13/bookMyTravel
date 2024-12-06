const jwt = require('jasonwebtoken');

const generateToken = (userdata) => {
    return jwt.sign(userdata, process.env.JWT_SECRET, { expireIn: '7d' });
}
const jwtAuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env, JWT_SECRET);
        req.user = decoded;
        next();

    } catch (err) {
        res.status(401).json({ error: 'invalid token' })
    }
};


module.exports = { generateToken, jwtAuthMiddleware };
