const postsModel = require("../models/posts.model");
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
	getAll: (req,res)=>{
		Post.find({})
			.then(posts=>{
				res.json(posts)
			})
			.catch(err=>(res.json(err)))
	},
	getOne: (req, res)=>{
		Post.findOne({_id:req.params.id})
		.then(post =>
			res.json(post))
			.catch(err=>res.json(err))
	}
};
