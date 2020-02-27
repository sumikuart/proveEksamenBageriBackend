const mongoose = require('mongoose');
const schema = mongoose.Schema;

let BrugerList = new schema({

    navn: {
        type:String,
        default: 'Error  - navn'
    },
    email: {
        type:String,
        default: 'Error  - mail'
    },
    password: {
        type:String,
        default: 'Error  - password'
    }

});


module.exports = mongoose.model('BrugerList', BrugerList, 'BrugerList')