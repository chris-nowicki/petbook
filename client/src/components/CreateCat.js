import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import MyContext from "../contexts/MyContext";
import { useNavigate } from "react-router-dom";

const CreateCat = () => {
	const { user, setUser } = useContext(MyContext);
	const [caption, setCaption] = useState("");
	const [picture, setPicture] = useState("");
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		// redirect /dashboard to /feed
		axios
			.get("http://localhost:8000/api/users/getUser", {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.data);
				setUser(res.data);
			})
			.catch((err) => {
				navigate("/dashboard/feed");
			});

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		axios
			.get("https://api.thecatapi.com/v1/images/search", {
				params: { limit: 1, size: "full" },
			})
			.then((res) => {
				setPicture(res.data[0].url);
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const getCat = (e) => {
		e.preventDefault();
		axios
			.get("https://api.thecatapi.com/v1/images/search", {
				params: { limit: 1, size: "full" },
			})
			.then((res) => {
				setPicture(res.data[0].url);
			})
			.catch((err) => console.log(err));
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8000/api/posts", {
				author_id: user._id,
				authorName: `${user.firstName} ${user.lastName}`,
				postImage: picture,
				content: caption,
				species: "cat",
			})
			.then((res) => {
				console.log(res);
				navigate("/dashboard/feed");
			})
			.catch((err) => {
				console.log(err);
				const errorResponse = err.res.data.errors;
				const errorArr = [];
				for (const key of Object.keys(errorResponse)) {
					errorArr.push(errorResponse[key].message);
				}
				setErrors(errorArr);
			});
	};
	return (
		<div className="App">
			<div className="Card">
				<img
					className="animaPicture"
					src={picture}
					alt="A cute and snuggly pet!"
				/>
			</div>
			<button onClick={getCat}>Get A Cat!</button>
			<div className="getForm">
				<form onSubmit={onSubmitHandler}>
					<label>
						<h4>Add a caption:</h4>
					</label>
					{errors.map((err, index) => (
						<p key={index}>{err}</p>
					))}
					<input type="hidden" value={picture} />
					<input
						type="text"
						onChange={(e) => setCaption(e.target.value)}
					/>
					<div>*8 characters required</div>
					<div>
						<button type="submit">Save This Kitty!</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateCat;
