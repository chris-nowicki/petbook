const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		author_id: {
			type: String,
		},
		authorName: {
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
			required: [true, "Caption is required and must be at least 8 characters"],
			trim: true,
			minlength: [8, "Your caption must be at least 8 characters"],
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
					required: [true, "Comment is required"],
					minlength: [
						4,
						"Your comment must be at least 4 characters",
					],
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
