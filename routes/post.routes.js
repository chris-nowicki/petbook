const PostController = require("../controllers/post.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
	app.post("/api/posts", PostController.createPost);
	app.get('/api/posts', PostController.getAll);
	app.get('/api/posts/:id', PostController.getOne)
};
