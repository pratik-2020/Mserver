const mongoose = require('mongoose');

const professorSchema = mongoose.Schema({
    prof_name: {
        type: String,
        required: true
    },
    university_name: {
        type: String
    },
    email: {
        type: String
    },
    paperAr: {
        type: Array
    },
    researchArea: {
        type: String
    },
    send: {
        type: Boolean
    }
});

const professorModel = mongoose.model('Professor', professorSchema);

module.exports = professorModel;