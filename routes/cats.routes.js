const CatsController = require("../controllers/cats.controller")

const catRoutes = (app)=>{
    //Create 
    app.post('/api/cats',CatsController.create)
    //console.log('post')
    //Read all
    app.get('/api/cats',CatsController.getAll)
    //console.log('read all')
    //Read one
    app.get('/api/cats/:id',CatsController.getOne)
    //console.log('get one')
    //Update caption
    app.put('/api/cats/:id',CatsController.update)
    //console.log('update')
    //Destroy
    app.delete('/api/cats/:id',CatsController.delete)

}

module.exports = catRoutes