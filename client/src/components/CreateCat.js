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
			{/* style */}

            <div className="flex w-full flex-col items-center">
			<div className='flex flex-col rounded border border-black p-4 shadow-md shadow-black/25 items-center mt-6'>
					<img
						className="animalPicture "
						src={picture}
						alt="A cute and snuggly pet!"
					/>
				<button className="w-full bg-stone-300 px-4 py-2 my-3 rounded hover:bg-orange-100" onClick={getCat}>Get A Cat!</button>
				<div className="getForm w-full items-center justify-center">
					<form onSubmit={onSubmitHandler}>
						{/* <label>
							<h4>Add a caption:</h4>
						</label> */}
						{errors.map((err, index) => (
							<p key={index}>{err}</p>
							))}
						<input type="hidden" value={picture} />
						<textarea rows="3" className="w-full p-2 rounded-lg border border-gray-300"
							type="text" placeholder="add a caption"
							onChange={(e) => setCaption(e.target.value)}
							/>
						<div>
						<p className='ml-4 text-sm'>*8 characters required</p>
						</div>
						<div className='flex flex-row justify-center'>
							<button className=' bg-stone-300 px-4 py-2 my-3 rounded hover:bg-orange-100' type="submit">Save This Kitty!</button>
						</div>
					</form>
				</div>
			</div>
			</div>

			{/* <div className="Card">
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
			</div> */}
		</div>
	);
};

export default CreateCat;
