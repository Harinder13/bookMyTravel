const nodemailer = require('nodemailer');





// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    Port: 465,
    auth: {
        user: 'akshit.kamboj.106@gmail.com', // Your email address
        pass: 'hfgs sqsr myrx lepo'   // Your email password or app-specific password
    }
});

// Email options 
async function sendMail(to, subject, text) {
    try {
        const info = await transporter.sendMail({
            from: 'akshit.kamboj.106@gmail.com', // Sender's email address
            to, // Recipient's email address
            subject, // Email subject
            text // Plain text body
        });
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw to handle it properly if required
    }
}


//Send the email
// transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         console.log('Error:', error);
//     } else {
//         console.log('Email sent:', info.response);
//     }
// })


module.exports = { sendMail }