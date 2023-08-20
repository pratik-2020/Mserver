const { google } = require('googleapis');
const professorModel = require('../../models/professor');
const axios = require('axios');

const getMailList = async (req, res) => {
    const config = {
        headers: {
            Authorization: "Bearer " + req.headers.acctk
        }
    };
    
    try {
        const response = await axios.get('https://gmail.googleapis.com/gmail/v1/users/me/messages', config);
        // console.log(response.data);
        return response.data; // Return the data obtained from the API
    } catch (error) {
        throw error; // Re-throw the error to handle it in the caller function
    }
};

const getMail = async (emails, ids, acctk) => {
    let mlst = [];
    const config = {
        headers: {
            Authorization: "Bearer " + acctk
        }
    };
    if( ids.messages !== undefined &&  ids.messages.length > 0){
        try{
            await Promise.all(ids.messages.map(async (e,k) => {
                try{
                    let resp = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${e.id}`, config);
                    // console.log(resp.data);
                    mlst.push(resp.data);
                    // console.log("Here we go!!");
                }catch(er){
                    res.send(er);
                }
            }));
            // console.log(mlst);
            return mlst;
        }catch(er){
            return er;
        }
    }
    else{
        // console.log("No ids");
        return "No data";
    }
}

const tracker = async (req, res) => {
    const acctk = req.headers.acctk;
    // console.log("acctk: " + acctk);
    try {
        const professorData = await professorModel.find();
        
        if (professorData.length > 0) {
            const emailArray = professorData.map(e => e.email);
            // console.log(emailArray);
            
            try {
                const mailData = await getMailList(req, res);
                // console.log("mailData");
                let mls = await getMail(emailArray, mailData, req.headers.acctk);
                // console.log("mails");
                let flt  = ["emails"];
                if(mls.length > 0){
                    flt  = await mls.filter((e) => {
                        let em = e.payload.headers.filter((el) => {
                            if(el.name === "From"){
                                return true;
                            }
                            else{
                                return false;
                            }
                        });
                        let emar = em[0].value.split('<');
                        let emr = emar[emar.length - 1].split('>');
                        // console.log(emr[0]);
                        if(emailArray.indexOf(emr[0]) !== -1){
                            return true;
                        }
                        else{
                            return false;
                        }
                    })
                }
                // console.log("flt :- "+flt);
                res.send(flt); // Sending the mail data as the response
            } catch (error) {
                res.status(500).send(error.message); // Sending an error response
            }
        } else {
            res.status(204).send({
                message: 'No Professor data is available'
            });
        }
    } catch (error) {
        res.status(500).send(error.message); // Sending an error response
    }
    // console.log("Namaste in tracker");
};

module.exports = tracker;
