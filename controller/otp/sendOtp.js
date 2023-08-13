const otpModel = require("../../models/otp");
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')
const sendOtp = (req, res) => {
    console.log("At the start")
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pratikthakur2019@gmail.com',
            pass: 'tumaqnhvuanufppp'
        }
    });
    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    console.log("task is here");
    var mailOptions = {
        from: 'pratikthakur2019@gmail.com',
        to: 'pratikthakur2019@gmail.com',
        subject: 'Otp for Mserver',
        text: `The otp is ${otp}`
      };
      console.log("Infi");
      transporter.sendMail(mailOptions, (err, info) => {
        console.log("Namaste");
        if(err){
            res.send(err);
        }
        else{
            console.log("here is it");
            otpModel.find().then((resp1) => {
                if(resp1.length === 0){
                    let optm = new otpModel();
                    optm.email = "pratikthakur2019@gmail.com";
                    optm.otpNum = otp;
                    optm.save().then((resp2) => {
                        res.status(200).send({
                            'message': 'Otp send'
                        });
                    }).catch((er2) => {
                        res.send(er2);
                    })
                }
                else{
                    otpModel.updateOne({
                        email: "pratikthakur2019@gmail.com"
                    }, {
                        otpNum: otp
                    }).then((resp2) => {
                        res.status(200).send({
                            'message': 'Email sent'
                        });
                    }).catch((er2) => {
                        res.send(er2);
                    })
                }
            }).catch((er1) => {
                res.send(er1);
            })
        }
      });
}

module.exports = sendOtp;