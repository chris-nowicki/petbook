import React from "react";
import Badge from "@mui/material/Badge";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function Card({
    postAuthor,
    postDate,
    postImage,
    postContent,
    postComments,
    postLikes,
}) {
	return (
		<>
			{/* feed */}

			{/* card for posts */}
			<div className="mr-2 mt-2 flex w-60 flex-col rounded border border-black p-4 shadow-md shadow-black/25">
				<p className="mb-2 text-center">
					<span className="text-orange-600">{postAuthor}</span> posted on{" "}
					<span className="text-orange-600">{postDate}</span>
				</p>
				<img src={postImage}alt="post" />
				<p className="text-md mt-3 ml-1">
					{postContent}
				</p>
				<div className="mt-6 flex w-full flex-row items-center justify-between">
					<Badge badgeContent={postComments} color={"primary"}>
						<ChatBubbleIcon color="action" fontSize="large" />
					</Badge>
					<div className="flex flex-row items-center mr-3">
						<Badge
							badgeContent={postLikes}
							color={"primary"}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
						>
							<ThumbUpIcon color="action" fontSize="large" />
						</Badge>
					</div>
				</div>
			</div>
		</>
	);
}

export default Card;
