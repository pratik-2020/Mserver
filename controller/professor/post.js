const client = require('../../db/db');

const addProfessor = (req, res) => {
    const prof_name = req.body.prof_name;
    const email = req.body.email;
    const university_name = req.body.university_name;
    const paperAr = req.body.paperAr;
    const researchArea = req.body.researchArea;
    const db = client.db('MServer');
    db.professor.insertOne({
        prof_name,
        email,
        university_name,
        paperAr,
        researchArea
    }).then((resp1) => {
        res.status(200).send({
            'message': 'Data added',
            'data': resp1
        });
    }).catch((er1) => {
        res.send(er1);
    })

}

module.exports = addProfessor;