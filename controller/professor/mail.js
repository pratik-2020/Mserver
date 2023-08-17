const nodemailer = require('nodemailer');
const otpModel = require('../../models/otp');
const professorModel = require('../../models/professor');
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
    const otp = req.body.otp;
    otpModel.find({
        email: "pratikthakur2019@gmail.com"
    }).then((resp11) => {
        if(resp11[0].otpNum === otp){
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
                    professorModel.updateOne({
                        email: email
                    }, {
                        send: true
                    }).then((resp101) => {
                        res.status(200).send({
                            'message': 'Mail send'
                        });
                    } ).catch((er101) => {
                        res.send(er101);
                    })
                }
            });
        }
        else{
            res.status(403).send({
                'message': 'Wrong Otp'
            })
        }
    }).catch((er11) => {
        res.send(er11);
    })
}

module.exports = sendMail;