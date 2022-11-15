import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "./Card";
//import { formatMuiErrorMessage } from '@mui/utils'

const ViewOne = () => {
	const [post, setPost] = useState({});
	const { id } = useParams();
	const [errors, setErrors] = useState([]);
	const [comments, setComments] = useState([]);
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [newComment, setNewComment] = useState("");

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/posts/${id}`)
			.then((res) => {
				setPost(res.data);
				setComments(res.data.comments);
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	// useEffect(()=>{
	//     axios.get('http://localhost:8000/api/users/getAuthor')
	//     .then(res=>{
	//         setUser(res.data)
	//         console.log(res.data)
	//     })
	//     .catch(err=> console.log(err))
	// },[])

	const handleComment = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:8000/api/posts/${id}`)
			.then((res) => {
				console.log(res);
				navigate("/dashboard");
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
			ViewOne
			<Card
				postAuthor="Placeholder"
				postDate={post.createdAt}
				postImage={post.postImage}
				postContent={post.content}
				// postLikes={post.Likes} This does not display in the card
			></Card>
			<p>Number of likes: {post.Likes}</p>
			{/* When I put the comments in the card it tries to mash them all into the chat bubble icon*/}
			<h4>Comments</h4>
			{comments.map((item) => (
				<>
					<div key={item.user_id}>{item.userName}</div>
					<div key={item.comment}>{item.comment}</div>
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
