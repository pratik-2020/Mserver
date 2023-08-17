const express = require('express');
const addProfessor = require('../controller/professor/post');
const getProfessors = require('../controller/professor/get');
const deleteProfessor = require('../controller/professor/delete');
const sendMail = require('../controller/professor/mail');
const tracker = require('../controller/professor/tracker');
const token = require('../controller/professor/token');
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
});

router.get('/tracker', (req, res) => {
    console.log("Tracker")
    tracker(req, res);
});
router.get('/token', (req, res) => {
    token(req, res);
})

module.exports = router;