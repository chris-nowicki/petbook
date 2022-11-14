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
		content: {
			type: String,
			trim: true,
		},
		Likes: {
			type: Number,
            default: 0,
        comments: [{
            author_id: {
                type: Number
            },
            comment: {
                type: String,
                trim: true
            }
        }]
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);