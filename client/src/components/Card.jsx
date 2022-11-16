import React, { useState, useEffect } from "react";
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
	userProps,
	postId,
	likeProps,
}) {
	const [clicked, setClicked] = useState(false);

	// check if the user is in the list of likes for the post
	let liked = likeProps.some((like) => like.user_id === userProps);

	// when user clicks like button this function runs
	const handleLikes = () => {
		axios
			.put("http://localhost:8000/api/posts/add-like", {
				id: postId,
				user_id: userProps,
			})
			.then((res) => {
				// if response from the database is added, set clicked to true
				// set clicked to true changes the color of the like button from gray to blue
				if (res.data.message === "added") {
					setClicked(true);
				} else {
					// if response from the database is not added then the like was deleted
					// set clicked to false changes the color of the like button from blue to gray
					setClicked(false);
				}
			});
	};

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
			{/* card for posts */}
			<div className="mr-2 mt-2 flex w-80 flex-col rounded border border-black p-4 shadow-md shadow-black/25">
				<a href={`/dashboard/view-one/${postId}`} className="viewOne">
					<p className="mb-2 text-center text-sm">
						<span className="text-orange-600">{authorName}</span>{" "}
						posted on{" "}
						{/* data of post */}
						<span className="text-orange-600">
							{month} {day}, {year}
						</span>
					</p>
					<div className="postCardImage flex flex-row justify-center pr-4">
						{/* post image */}
						<img src={postImage} alt="post" />
					</div>

					{/* post content */}
					<p className="text-md mt-3 ml-1">{postContent}</p>
				</a>
				<div className="mt-6 flex w-full flex-row items-center justify-between">
					{/* displays the number of messages */}
					<Badge badgeContent={postComments} color={"primary"}>
						<ChatBubbleIcon color="action" fontSize="large" />
					</Badge>
					<div className="mr-3 flex flex-row items-center">
						{/* displays the thumbs up (like) button */}
						<Badge
							color={"primary"}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
						>
							<button onClick={() => handleLikes()}>
								<ThumbUpIcon
									color={
										liked || clicked ? "primary" : "action"
									}
									fontSize="large"
								/>
							</button>
						</Badge>
					</div>
				</div>
			</div>
		</>
	);
}

export default Card;
