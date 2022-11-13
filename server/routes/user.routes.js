const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
const MessagesController = require('../controllers/message.controller');

module.exports = (app) => {
    app.get('/api/users', authenticate, UserController.getAllUsers)
    app.get('/api/users/getUser', authenticate, UserController.getLoggedInUser)
    app.post('/api/users/register', UserController.register);
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
    app.post('/api/messages', MessagesController.create);
    app.get('/api/messages', MessagesController.getAll);
    app.get('/api/messages/:id',MessagesController.getOne);
}