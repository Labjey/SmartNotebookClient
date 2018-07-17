var mongoose = require('mongoose');
const applicationSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postWebsite: String,
    jobDescription: String,
    sourceOfJobPosting: String,
    email: {
        type: String,
        required: true
    },
    contactName: {
        type: String,
        required: true
    },
    phoneNumber: String,
    resumeVersion: {
        type: String,
        required: true
    },
    followUps: [String],
    userId: {
        type: String,
        required: true
    },
    notes: String
});

//create model object using schema
const Application = mongoose.model('Application', applicationSchema);

//make this available to Node applications
module.exports = Application;