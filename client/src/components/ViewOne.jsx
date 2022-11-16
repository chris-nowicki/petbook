import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
// import MyContext from "../contexts/MyContext";
//import { formatMuiErrorMessage } from '@mui/utils'

const ViewOne = () => {
	const [post, setPost] = useState({});
	const { id } = useParams();
	const [errors, setErrors] = useState([]);
	const [comments, setComments] = useState([]);
	const navigate = useNavigate();
	const [newComment, setNewComment] = useState("");
	const [likes, setLikes] = useState([])
	// const { user, setLoaded } = useContext(MyContext);

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/posts/${id}`)
			.then((res) => {
				setPost(res.data);
				setComments(res.data.comments);
				setLikes(res.data.likes)
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleComment = (e) => {
		e.preventDefault();
		axios.put(`http://localhost:8000/api/posts/add-comment/${id}`,{
			//user_id,
			//userName,
			comment : newComment
		})
			.then((res) => {
				console.log(res);
				//navigate("/dashboard");
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
			<h4>Posted on: {post.createdAt}</h4>
			<img src={post.postImage}></img>
			{post.content}
			<p>Number of likes: {likes.length}</p>
			<h4>Comments</h4>
			{comments.map((item) => (
				<>
					<div key={item.user_id}><h3>{item.userName}</h3></div>
					<div key={item.comment}><p>{item.comment}</p></div>
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
