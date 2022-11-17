const PostController = require("../controllers/post.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
	app.get("/api/posts", authenticate, PostController.getAllPosts);
	app.post("/api/posts", authenticate, PostController.createPost);
	app.put("/api/posts/add-comment/:id", authenticate, PostController.addComment);
	app.put("/api/posts/add-like", authenticate, PostController.addLike);
	app.get("/api/posts/:id", authenticate, PostController.getOne);
	app.put(
		"/api/posts/update-content/:id",
		authenticate,
		PostController.updateContent
	);
	app.put("/api/posts/delete-comment/", PostController.deleteComment);
	app.delete("/api/posts/delete-post/:id", authenticate, PostController.deletePost);
};