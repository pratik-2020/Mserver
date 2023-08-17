const { google } = require('googleapis');
const professorModel = require('../../models/professor');
const axios = require('axios');
const genToken = (req, res) => {
    
}
const getMail = async (req, res) => {
    const config = {
        headers: {
            authorization: "Bearer "+ req.headers.acctk
        }
    }
    await axios.get('https://gmail.googleapis.com/gmail/v1/users/me/messages', config).then((response) => {
        console.log(response);
        res.send(response);
    }).catch((er) => {
        // console.log(er);
        res.send(er);
    })
}

const getMailList = (req, res) => {
    
}

const tracker = (req, res) => {
    const acctk = req.headers.acctk;
    console.log("acctk :- "+acctk);
    professorModel.find().then((resp1) => {
        if(resp1.length > 0){
            let email = [];
            resp1.map((e) => {
                email.push(e.email);
            });
            console.log(email);
            // getMailList(req, res).then((resp2) => {
            //     // if(resp2.sender)
            //     let mails = [];
            //     if(resp2.length > 0){
            //         mails = resp2.filter((e) => {
            //             if(email.indexOf(e.sender) !== -1){
            //                 return true;
            //             }
            //             return false;
            //         });
            //         res.status(200).send({
            //             'message': 'Mails are here',
            //             'data': mails
            //         });
            //     }
            //     else{
            //         res.status(204).send({
            //             'message': 'No mails'
            //         });
            //     }
            // }).catch((er2) => {
            //     res.send(er2);
            // })
            getMail(req, res);
        }
        else{
            res.status(204).send({
                'message': 'No Professor data is here'
            })
        }
    }).catch((er1) => {
        res.send(er1);
    })
}

module.exports = tracker;