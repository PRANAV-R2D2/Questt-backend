const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstname:{
        type: 'string',
        default: null,
    },
    lastname:{
        type: 'string',
        default: null,
    },
    email:{
        type: 'string',
        unique: true,
        required: true,
    },
    passwords:{
        type: 'string',
    },
    token:{
        type: 'string',
    }

});


module.exports = mongoose.model('user',userSchema);