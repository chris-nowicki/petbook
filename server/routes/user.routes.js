const UserController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
	app.get("/api/users", authenticate, UserController.getAllUsers);
	app.get("/api/users/getUser", authenticate, UserController.getLoggedInUser);
	app.get("/api/users/getAuthor", UserController.getAuthor);
	app.post("/api/users/register", UserController.register);
	app.post("/api/users/login", UserController.login);
	app.post("/api/users/logout", UserController.logout);
};
