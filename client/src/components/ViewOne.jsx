import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import MyContext from "../contexts/MyContext";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const ViewOne = () => {
	const [post, setPost] = useState([]);
	const { id } = useParams();
	const [errors, setErrors] = useState([]);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [likes, setLikes] = useState([]);
	const [pageContent, setPageContent] = useState("");
	const [author_id, setAuthor_id] = useState("");
	const { user, setShowFilter } = useContext(MyContext);
	const [clicked, setClicked] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setShowFilter(false);

		axios
			.get(`http://localhost:8000/api/posts/${id}`)
			.then((res) => {
				setPost(res.data);
				setLikes(res.data.likes);
				setPageContent(res.data.content);
				setAuthor_id(res.data.author_id);
				let sortComments = res.data.comments
				sortComments = sortComments.reverse()
				setComments([...sortComments]);
			})
			.catch((err) => console.log(err));
	}, []);

	// check if the user is in the list of likes for the post
	let liked = likes.some((like) => like.user_id === user._id);

	// when user clicks like button this function runs
	const handleLikes = () => {
		axios
			.put("http://localhost:8000/api/posts/add-like", {
				id: post._id,
				user_id: user._id,
			})
			.then((res) => {
				// if response from the database is added, set clicked to true
				// set clicked to true changes the color of the like button from gray to blue
				if (res.data.message === "added") {
					setClicked(true);
					setLikes([...likes, { user_id: user._id }]);
				} else {
					// if response from the database is not added then the like was deleted
					// set clicked to false changes the color of the like button from blue to gray
					setClicked(false);
					let updatedLikes = [...likes];
					updatedLikes = updatedLikes.filter(
						(like) => like.user_id !== user._id
					);
					setLikes([...updatedLikes]);
				}
			});
	};

	//Add the visible className after :
	const visible = user._id != author_id ? "invisible" : "";

	const handleUpdate = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:8000/api/posts/update-content/${id}`, {
				content: pageContent,
			})
			.then((res) => {
				console.log(res);
				setPageContent(res.data.content);
				document
					.getElementById("updatePostContent")
					.classList.toggle("hidden");
				document
					.getElementById("contentNoEdit")
					.classList.toggle("hidden");
				setErrors([]);
			})
			.catch((err) => {
				console.log(err.response.data.errors.content);
				setErrors(err.response.data.errors.content);
			}, []);
	};

	const handleDelete = (_id) => {
		axios
			.delete(`http://localhost:8000/api/posts/delete-post/${id}`)
			.then((res) => {
				console.log(res);
				navigate("/dashboard/feed");
			})
			.catch((err) => console.log(err));
	};

	// convert the date
	//get date from when post was created at through the date props
	let convertedDate = new Date(post.createdAt);

	// get the month
	let month = convertedDate.getMonth();
	month = convertedDate.toLocaleDateString("en", { month: "short" });
	month = month.toUpperCase();

	// get day of month
	let day = convertedDate.getDate();

	// get full year
	let year = convertedDate.getFullYear();

	const handleComment = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:8000/api/posts/add-comment/${id}`, {
				fname: user.firstName,
				lname: user.lastName,
				user_id: user._id,
				comment: newComment,
			})
			.then((res) => {
				let sortComments = res.data.comments
				sortComments = sortComments.reverse()
				setComments([...sortComments]);
				let element = document.getElementById("addComment");
				element.classList.toggle("hidden");
				let element2 = document.getElementById("comment");
				element2.value = "";
				setErrors([]);
			})
			.catch((err) => {
				console.log(err.response.data.errors["comments.comment"]);
				setErrors(err.response.data.errors["comments.comment"]);
			}, []);
	};

	const handleCommentDelete = (commentId) => {
		console.log(commentId);
		axios
			.put(`http://localhost:8000/api/posts/delete-comment`, {
				id: post._id,
				commentId: commentId,
			})
			.then((res) => {
				let updateComments = comments.filter(
					(comment) => comment._id !== commentId
				);
				setComments([...updateComments]);
			});
	};
	return (
		<div className="flex min-h-screen w-full flex-col p-6">
			<div className="mb-1 flex w-full flex-row items-center justify-between">
				<h3>
					<span className="ml-1 text-orange-400">
						{post.authorName}{" "}
					</span>
					posted on{" "}
					<span className="text-orange-400">
						{month} {day}, {year}{" "}
					</span>
				</h3>
				{post.author_id === user._id && (
					<div>
						<button
							className="mr-2 hover:text-orange-400"
							onClick={() => {
								document
									.getElementById("updatePostContent")
									.classList.toggle("hidden");
								document
									.getElementById("contentNoEdit")
									.classList.toggle("hidden");
								document.getElementById("updateComment").value =
									"";
							}}
						>
							edit
						</button>
						|
						<button
							className="ml-2 mr-1 hover:text-orange-400"
							onClick={handleDelete}
						>
							delete
						</button>
					</div>
				)}
			</div>
			<div className="flex w-full flex-col rounded bg-gray-200 p-4 shadow-md shadow-black/25">
				{/* author content with hidden update */}

				<form onSubmit={handleUpdate}>
					<div
						id="updatePostContent"
						className="mb-4 flex hidden flex-row items-center"
					>
						<div className="flex w-full flex-col">
							<textarea
								rows={2}
								name="content"
								id="updateContent"
								value={pageContent}
								className="w-3/4 rounded-md border-gray-300 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								defaultValue={pageContent}
								onChange={(e) => setPageContent(e.target.value)}
							/>
							{errors && (
								<p className="ml-1 text-sm text-red-600">
									{errors.message}
								</p>
							)}
						</div>
						<button className="ml-10 w-1/4 rounded bg-orange-400 py-2 text-xl text-white shadow-md shadow-black/25">
							Update
						</button>
					</div>
				</form>
				<p id="contentNoEdit" className="ml-1 mb-4 text-lg">
					{pageContent}
				</p>

				<img
					src={post.postImage}
					alt="Post image"
					className="viewOnePicture rounded"
				/>
				<div className="mt-2 flex w-full flex-row items-center justify-between">
					<button
						className="mx-1 rounded px-2 py-2 hover:bg-gray-300"
						onClick={() => {
							let element = document.getElementById("addComment");
							element.classList.toggle("hidden");
						}}
					>
						<ChatBubbleIcon color="action" fontSize="medium" />
						<span className="ml-1">comment</span>
					</button>

					<div className="flex flex-row items-center">
						<p className="mt-2 font-bold text-orange-400">
							{likes.length}
						</p>{" "}
						<button className="mx-2" onClick={() => handleLikes()}>
							<ThumbUpIcon
								color={liked || clicked ? "primary" : "action"}
								fontSize="large"
							/>
						</button>
					</div>
				</div>
			</div>
			{/* add comment */}
			<form onSubmit={handleComment}>
				<div
					id="addComment"
					className="mt-3 hidden rounded bg-orange-300 p-6 transition-all ease-in-out"
				>
					<label
						htmlFor="comment"
						className="block text-lg font-medium"
					>
						Add your comment:
					</label>
					<div className="mt-1">
						<textarea
							rows={2}
							name="comment"
							id="comment"
							className=" block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							defaultValue={""}
							onChange={(e) => setNewComment(e.target.value)}
						/>
						{errors && (
							<p className="ml-1 text-sm text-red-600">
								{errors.message}
							</p>
						)}
					</div>
					<div className="flex w-full flex-row">
						<button className=" mt-3 w-full border-black bg-orange-400 py-2 text-xl text-white shadow-md shadow-black/25">
							Submit
						</button>
					</div>
				</div>
			</form>
			{/* end add comment */}
			<div className="mt-4 flex flex-col shadow-sm shadow-black/25">
				<h4 className="w-full rounded-t border-b bg-orange-400 text-center text-lg font-bold text-white">
					Comments
				</h4>
				{comments.map((comment, index) => (
					<>
						{index % 2 !== 1 ? (
							<div
								key={comment._id}
								className="flex w-full flex-col justify-center rounded border-b bg-slate-50 pb-2 pl-2"
							>
								<h3 className="text-md mt-2 text-orange-400">
									{comment.userName}
								</h3>
								<div className="flex w-full flex-row items-center justify-between">
									<p>{comment.comment}</p>
									{(post.author_id === user._id ||
										comment.user_id === user._id) && (
										<button
											className="relative top-0 right-0 mx-2 -translate-y-1/2"
											onClick={() =>
												handleCommentDelete(comment._id)
											}
										>
											delete
										</button>
									)}
								</div>
							</div>
						) : (
							<div
								key={comment._id}
								className="flex w-full flex-col justify-center rounded border-b pb-2 pl-2"
							>
								<h3 className="text-md mt-2 text-orange-400">
									{comment.userName}
								</h3>
								<div className="flex w-full flex-row items-center justify-between">
									<p>{comment.comment}</p>
									{(post.author_id === user._id ||
										comment.user_id === user._id) && (
										<button
											className="relative top-0 right-0 mx-2 -translate-y-1/2"
											onClick={() =>
												handleCommentDelete(comment._id)
											}
										>
											delete
										</button>
									)}
								</div>
							</div>
						)}
					</>
				))}
			</div>
		</div>
	);
};

export default ViewOne;
