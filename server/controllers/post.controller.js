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
		const { id } = req.params
		const { user_id, fname, lname, comment } = req.body;
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
		console.log("we get here");
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
	getOne: (req, res) => {
		Post.findOne({ _id: req.params.id })
			.then((post) => res.json(post))
			.catch((err) => res.json(err));
	},
	checkIfLiked: async (req, res) => {
		const { id, user_id } = req.body;

		Post.find({ _id: id, likes: { $elemMatch: { user_id: user_id } } })
			.then((liked) => res.json(liked))
			.catch((err) => console.log(err));
	},
	updateContent:(req,res)=>{
		Post.findByIdAndUpdate({_id:req.params.id}, req.body,{new:true, runValidators:true})
			.then(updatedContent=>res.json(updatedContent))
			.catch(err=>res.status.json(err))
	},
	deletePost:(req,res)=>{
		Post.deleteOne({_id:req.params.id})
			.then(deleteConfirmation=>res.json(deleteConfirmation))
			.catch(err=>res.json(err))
	}
};
