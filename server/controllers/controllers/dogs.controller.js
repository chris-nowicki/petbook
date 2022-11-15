const Dogs = require('../models/dogs.model');
const {request, response} = require('express');


const DogsController = {
    // Create description
    create:(req,res)=>{
        const{caption, picture} =req.body;
        Dogs.create({
            caption:caption,
            picture:picture
        })
        .then(cat=>res.json(cat))
        .catch(err=>res.status(400).json(err))
    },
    
    //Read All
    getAll:(req,res)=>{
        Dogs.find({})
        .then(cats=>{
            res.json(cats)
        })
        .catch(err=>res.status(400).json(err))
        
    },
    //Read One
    getOne:(req,res)=>{
        Dogs.findOne({_id:req.params.id})
        .then(cat=>
            res.json(cat))
            .catch(err=>res.status(400).json(err))
    },
    //Update
    update:(req,res)=>{
        Dogs.findOneAndUpdate({_id:req.params.id}, req.body,{new:true, runValidators:true})
        .then(updatedCaption =>res.json(updatedCaption))
        .catch(err=>res.status(400).json(err))
    },
    //Delete
    delete:(req,res)=>{
        Dogs.deleteOne({_id:req.params.id})
        .then(deleteConfirmation=> res.json(deleteConfirmation))
        .catch(err=>res.json(err))
    }

}

module.exports = DogsController