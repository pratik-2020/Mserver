// const client = require('../../db/db');
const professorModel = require('../../models/professor');

const addProfessor = (req, res) => {
    let profm = new professorModel();
    profm.prof_name = req.body.prof_name;
    profm.email = req.body.email;
    profm.university_name = req.body.university_name;
    profm.paperAr = req.body.paperAr;
    profm.researchArea = req.body.researchArea;
    console.log(req.body.researchArea);
    // const db = client.db('MServer');
    // profm.save().then((resp1) => {
    //     console.log("here :- "+prof_name);
    //     res.status(200).send({
    //         'message': 'Data added',
    //         'data': resp1
    //     });
    // }).catch((er1) => {
    //     res.send(er1);
    // })
    profm.save().then((resp1) => {
        res.status(200).send({
            'message': 'Data added',
            'data': resp1
        });
    }).catch((er1) => {
        res.send(er1);
    })
}

module.exports = addProfessor;