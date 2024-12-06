const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv')
const db = require('./db.js')
const cloudinary = require('cloudinary')
const multer = require('multer');
dotenv.config();
const { v4: uuidv4 } = require('uuid')
const authMiddleware = require('./middlewares/authMiddleware.js');

console.log("cloud_Name", process.env.cloud_Name);


cloudinary.config({
    cloud_name: process.env.cloud_Name,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_Secret


})
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        console.log("insidefilename fxn", file);
        const random = uuidv4()
        cb(null, random + "" + file.originalname)
    }
})

const app = express();
db();



app.use(cors());

app.use(express.json());
app.use(morgan('dev'));

//post reques



app.use('/auth', require('./routes/authRoute.js'))
app.use('/admin', require('./routes/adminRoute.js'))
app.use('/user', require('./routes/userRoute.js'))
app.use('/book', require('./routes/bookRoute.js'))
app.use('/travel', require('./routes/travelRoute.js'))

const upload = multer({ storage: storage })

app.post("/", upload.single('image'), (req, res) => {
    try {
        console.log(req.file.path);

        const x = cloudinary.uploader
            .upload(req.file.path)
        console.log(x);
        res.send('welcome to booking service');
    } catch (err) {
        console.log("err", err);
        res.send({ messgae: err });
    }

}
)


PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);

})