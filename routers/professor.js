const express = require('express');
const addProfessor = require('../controller/professor/post');
const getProfessors = require('../controller/professor/get');
const deleteProfessor = require('../controller/professor/delete');
const sendMail = require('../controller/professor/mail');
const router = express.Router();

router.get('/', (req, res) => {
    getProfessors(req, res);
});

router.post('/', (req, res) => {
    addProfessor(req, res);
});

router.delete('/', (req, res) => {
    deleteProfessor(req, res);
});

router.post('/mail', (req, res) => {
    sendMail(req, res);
})

module.exports = router;