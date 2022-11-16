import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import MyContext from "../contexts/MyContext";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

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
	const [clicked, setClicked] = useState(false)
	const navigate = useNavigate();

	useEffect(() => {
		setShowFilter(false);

		axios
			.get(`http://localhost:8000/api/posts/${id}`)
			.then((res) => {
				setPost(res.data);
				setComments(res.data.comments);
				setLikes(res.data.likes);
				setPageContent(res.data.content);
				setAuthor_id(res.data.author_id);
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
					setLikes([...likes, {user_id: user._id}])
				} else {
					// if response from the database is not added then the like was deleted
					// set clicked to false changes the color of the like button from blue to gray
					setClicked(false);
					let updatedLikes = [...likes]
					updatedLikes = updatedLikes.filter(like => like.user_id !== user._id)
					setLikes([...updatedLikes])
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
			})
			.catch((err) => {
				console.log(err);
				const errorResponse = err.response.data.errors;
				const errorArr = [];
				for (const key of Object.keys(errorResponse)) {
					errorArr.push(errorResponse[key].message);
				}
				setErrors(errorArr);
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
				setComments(res.data.comments);
			})
			.catch((err) => {
				console.log(err);
				const errorResponse = err.response.data.errors;
				const errorArr = [];
				for (const key of Object.keys(errorResponse)) {
					errorArr.push(errorResponse[key].message);
				}
			}, []);
	};
	return (
		<div className="flex h-screen w-full flex-col p-6">
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
				<div>
					<button className="mr-2 hover:text-orange-400">edit</button>
					|
					<button
						className="ml-2 mr-1 hover:text-orange-400"
						onClick={handleDelete}
					>
						delete
					</button>
				</div>
			</div>
			<div className="flex w-full flex-col rounded bg-gray-200 p-4 shadow-md shadow-black/25">
				<p className="ml-1 mb-4 text-lg">{pageContent}</p>

				<img
					src={post.postImage}
					alt="Post image"
					className="rounded"
				/>
				<div className="mt-2 flex w-full flex-row items-center justify-end">
					<p className="mt-2 mr-1 font-bold text-orange-400">
						{likes.length}
					</p>{" "}
					<button className="mx-1" onClick={() => handleLikes()}>
						<ThumbUpIcon
							color={liked || clicked ? "primary" : "action"}
							fontSize="large"
						/>
					</button>
				</div>
			</div>
			<h4>Comments</h4>
			{comments.map((comment) => (
				<>
					<div key={comment._id}>
						<h3>{comment.userName}</h3>
						<p className="mt-3">{comment.comment}</p>
					</div>
				</>
			))}

			<form onSubmit={handleComment}>
				{errors.map((err, index) => (
					<p key={index}>{err}</p>
				))}
				<label>Post a comment: </label>
				<input
					type="text-area"
					className="border border-black"
					onChange={(e) => setNewComment(e.target.value)}
				/>
				<button className=" w-half border border-black bg-black py-3 text-xl text-white shadow-md shadow-black/25">
					Submit
				</button>
			</form>
			<div className={visible}>
				<form onSubmit={handleUpdate}>
					{errors.map((err, index) => (
						<p key={index}>{err}</p>
					))}
					<label>Update Post Content: </label>
					<input
						type="text-area"
						className="border border-black"
						onChange={(e) => setPageContent(e.target.value)}
					/>
					<button className="w-half border border-black bg-black py-3 text-xl text-white shadow-md shadow-black/25">
						Update
					</button>
				</form>
			</div>
		</div>
	);
};

export default ViewOne;
