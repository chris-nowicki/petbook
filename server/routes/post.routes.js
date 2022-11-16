const PostController = require("../controllers/post.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
	app.get("/api/posts", PostController.getAllPosts);
	app.post("/api/posts", PostController.createPost);
	app.put("/api/posts/add-comment/:id", PostController.addComment);
	app.put("/api/posts/add-like", PostController.addLike);
	app.get('/api/posts/:id', PostController.getOne);
	
};
