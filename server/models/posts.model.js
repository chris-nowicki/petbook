const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		author_id: {
			type: String,
		},
		postImage: {
			type: String,
			trim: true,
		},
		species: {
			type: String,
			enum: ["cat", "dog"],
		},
		content: {
			type: String,
			trim: true,
		},
		likes: [
			{
				user_id: {
					type: String,
				},
			},
		],
		comments: [
			{
				user_id: {
					type: String,
				},
				userName: {
					type: String,
				},
				comment: {
					type: String,
					trim: true,
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
// comment