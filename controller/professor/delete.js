const client = require('../../db/db');
const professorModel = require('../../models/professor');
const deleteProfessor = (req, res) => {
    const id = req.params.id;
    let db = client.db('MServer');
    professorModel.deleteOne({
        _id: id
    }).then((resp1) => {
        res.status(200).send({
            'message': 'User deleted',
            'data': resp1
        });
    }).catch((er1) => {
        res.send(er1);
    })

}

module.exports = deleteProfessor;
