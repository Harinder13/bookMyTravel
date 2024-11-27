const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv')
const db = require('./db.js')
dotenv.config();
const authMiddleware = require('./middlewares/authMiddleware.js');

const app = express();
db();

app.use(cors());

app.use(express.json());
app.use(morgan('dev'));


app.use('/auth', require('./routes/authRoute.js'))
app.use('/admin', require('./routes/adminRoute.js'))
app.use('/user', require('./routes/userRoute.js'))
app.use('/book', require('./routes/bookRoute.js'))
app.use('/travel', require('./routes/travelRoute.js'))

app.get("/", (req, res) => {
    return res.status(200).send('welcome to booking service');
}
)


PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);

})