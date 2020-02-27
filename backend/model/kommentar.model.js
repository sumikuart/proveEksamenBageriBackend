const mongoose = require('mongoose');
const schema = mongoose.Schema;

let KommentarList = new schema({

    forfatter: {
        type:String,
        default: 'Error  - forfatter'
    },
    produkt_id: {
        type:String,
        default: 'Error  - produkt'
    },
    kommentar: {
        type:String,
        default: 'Error  - password'
    }

});


module.exports = mongoose.model('KommentarList', KommentarList, 'KommentarList')