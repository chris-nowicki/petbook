const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    picture : {
        type: String,
    },
    caption:{
        type:String,
        required:[true, 'Caption required'],
        minlength:[8, 'Caption required']
    }
    
}, {timestamps: true})

const modelName = mongoose.model(messages, MessagesSchema);

module.exports = modelName;