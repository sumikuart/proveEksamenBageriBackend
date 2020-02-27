const mongoose = require('mongoose');
const schema = mongoose.Schema;

let LikeList = new schema({

    liked: {
        type:String,
        default: 'normal'
    },
    produkt_id: {
        type:String,
        default: 'Error  - produkt'
    },
    brugerNavn: {
        type:String,
        default: ''
    }

});


module.exports = mongoose.model('LikeList', LikeList, 'LikeList')