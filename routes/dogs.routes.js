const DogsController = require("../controllers/dogs.controller")

const dogRoutes = (app)=>{
    //Create 
    app.post('/api/dogs',DogsController.create)
    //console.log('post')
    //Read all
    app.get('/api/dogs',DogsController.getAll)
    //console.log('read all')
    //Read one
    app.get('/api/dogs/:id',DogsController.getOne)
    //console.log('get one')
    //Update caption
    app.put('/api/dogs/:id',DogsController.update)
    //console.log('update')
    //Destroy
    app.delete('/api/dogs/:id',DogsController.delete)

}

module.exports = dogRoutes