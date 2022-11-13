const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    picture : {
        type: String,
    },
    caption:{
        type:String,
        required:[true, 'Caption required'],
        minlength:[8, 'Caption must be 8 characters long']
    },
    user_id: {
        type:String,
        required:[true, 'Must be logged in to send message']
    }
    
}, {timestamps: true})

const modelName = mongoose.model('messages', MessagesSchema);

module.exports = modelName;