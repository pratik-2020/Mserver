const nodemailer = require('nodemailer');
const sendMail = (req, res) => {
    const email = req.body.email;
    const mailBody = req.body.mailBody;
    const subject = req.body.subject;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pratikthakur2019@gmail.com',
            pass: 'tumaqnhvuanufppp'
        }
    });
    var mailOptions = {
        from: 'pratikthakur2019@gmail.com',
        to: email,
        subject: subject,
        text: `${mailBody}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            res.send(err);
        }
        else{
            res.status(200).send({
                'message': 'Mail send'
            });
        }
    });
}

module.exports = sendMail;