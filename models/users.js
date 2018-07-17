var mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        email: true
    }
});

//create model object using schema //make this available to Node applications
module.exports = mongoose.model('userSchema', userSchema);