const mongoose = require('mongoose');
const schema = mongoose.Schema;

let LetterList = new schema({

    email: {
        type:String,
        default: 'Error  - mail'
    }

});


module.exports = mongoose.model('LetterList', LetterList, 'LetterList')