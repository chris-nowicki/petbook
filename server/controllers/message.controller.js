const Messages = require ('../models/messages.model')

const MessagesController ={
    create:(req,res)=>{
        const {caption, picture} = req.body;
        Messages.create({
            caption:caption,
            picture, picture
        })
        .then(message=>res.json(message))
        .catch(err=>res.status(400).json(err))
    },
    getAll:(req, res)=>{
        Messages.find({})
        .then(messages=>{
            res.json(messages)
        })
        .catch(err=>res.status(400).json(err))
    },
    getOne:(req, res)=>{
        Messages.findOne({_id:req.params.id})
        .then(message=> res.json(message))
        .catch(err=>res.status(400).json(err))
    }
}

module.exports = MessagesController