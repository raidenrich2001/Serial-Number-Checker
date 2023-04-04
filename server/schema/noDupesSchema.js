const mongoose = require('mongoose');

const noDupes = new mongoose.Schema({
    stb:{
        type: String
    },
    accessories:{
        type: String
    },
    vendor:{
        type: String
    },
    serialno:{
        type: String
    }
})

module.exports = mongoose.model('noDupesSchema',noDupes)