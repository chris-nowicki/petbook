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
				response.status(400).json(err);
			});
	},

	getAllPosts: async (req, res) => {
		Post.find({})
			.then((posts) => {
				res.json(posts);
			})
			.catch((err) => {
				console.log(err);
				response.status(400).json(err);
			});
	},

	addComment: async (req, res) => {
		const { id, user_id, fname, lname, comment } = req.body;
		console.log(req.body);
		Post.findOneAndUpdate(
			{ _id: id },
			{
				$addToSet: {
					comments: {
						user_id: user_id,
						userName: `${fname} ${lname}`,
						comment: comment,
					},
				},
			},
			{
				new: true,
			}
		)
			.then((updatePost) => res.json(updatePost))
			.catch((err) => res.status(400).json(err));
	},

	addLike: async (req, res) => {
		const { id, user_id } = req.body;
		console.log(req.body);
		Post.findOneAndUpdate(
			{ _id: id },
			{
				$addToSet: {
					likes: {
						user_id: user_id,
					},
				},
			},
			{
				new: true,
			}
		)
			.then((updatePost) => res.json(updatePost))
			.catch((err) => res.status(400).json(err));
	},
};

// comment