import React from "react";
import Badge from "@mui/material/Badge";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";

function Card({
	authorName,
	postDate,
	postImage,
	postContent,
	postComments,
	postLikes,
}) {
	// convert the date
	//get date from when post was created at through the date props
	let convertedDate = new Date(postDate);

	// get the month
	let month = convertedDate.getMonth();
	month = convertedDate.toLocaleDateString("en", { month: "short" });
	month = month.toUpperCase();

	// get day of month
	let day = convertedDate.getDate();

	// get full year
	let year = convertedDate.getFullYear();

	return (
		<>
			{/* feed */}

			{/* card for posts */}
			<div className="mr-2 mt-2 flex w-80 flex-col rounded border border-black p-4 shadow-md shadow-black/25">
				<p className="mb-2 text-center text-sm">
					<span className="text-orange-600">{authorName}</span> posted
					on{" "}
					<span className="text-orange-600">
						{month} {day}, {year}
					</span>
				</p>
				<div className="postCardImage flex flex-row justify-center pr-4">
					<img src={postImage} alt="post" />
				</div>
				<p className="text-md mt-3 ml-1">{postContent}</p>
				<div className="mt-6 flex w-full flex-row items-center justify-between">
					<Badge badgeContent={postComments} color={"primary"}>
						<ChatBubbleIcon color="action" fontSize="large" />
					</Badge>
					<div className="mr-3 flex flex-row items-center">
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
