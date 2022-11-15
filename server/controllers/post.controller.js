const Post = require("../models/posts.model");

module.exports = {
	createPost: async (req, res) => {
		Post.create(req.body)
			.then((post) => {
				console.log(post);
				res.json(post);
			})
			.catch((err) => {
				console.log(err);
				res.json(err);
			});
	},
};
