const client = require('../../db/db');
const professorModel = require('../../models/professor');
const getProfessors = (req, res) => {
    let db = client.db('MServer');

    professorModel.find().then((resp1) => {
        res.status(200).send({
            'message': 'Professor list is here',
            'data': resp1
        });
    }).catch((er1) => {
        res.send(er1);
    })
}

module.exports = getProfessors;