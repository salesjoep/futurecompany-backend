const nodemailer = require('nodemailer');

const sendEmail = async options => {
    // create a transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "580d825680023f",
            pass: "535ffe12a5c497"
        }
    });

    // Define the email options
    const mailOptions = {
        from: 'Simptel <hello@jonas.io>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    }
    
    // Actually send the email
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;