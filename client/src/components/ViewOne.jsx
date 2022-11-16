import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import MyContext from "../contexts/MyContext";

const ViewOne = () => {
	const [post, setPost] = useState([]);
	const { id } = useParams();
	const [errors, setErrors] = useState([]);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [likes, setLikes] = useState([]);
	const { user } = useContext(MyContext);

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/posts/${id}`)
			.then((res) => {
				setPost(res.data);
				setComments(res.data.comments);
				setLikes(res.data.likes);
			})
			.catch((err) => console.log(err));
	}, []);

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
		<div>
			<h3>Posted by: {post.authorName}</h3>
			<h4>Posted on: {month} {day}, {year}</h4>
			<img src={post.postImage}></img>
			{post.content}
			<p>Number of likes: {likes.length}</p>
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
		</div>
	);
};

export default ViewOne;
