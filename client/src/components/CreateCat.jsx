import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import MyContext from "../contexts/MyContext";
import { useNavigate } from "react-router-dom";

const CreateCat = () => {
	const { user, setUser, setShowFilter } = useContext(MyContext);
	const [caption, setCaption] = useState("");
	const [picture, setPicture] = useState("");
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		setShowFilter(false);
		axios
			.get("http://localhost:8000/api/users/getUser", {
				withCredentials: true,
			})
			.then((res) => {
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
				console.log(err.response.data.errors.content);
				setErrors(err.response.data.errors.content);
			});
	};
	return (
		<div className="flex h-screen w-full flex-col items-center">
			<div className="mt-6 flex flex-col items-center rounded border border-black p-4 shadow-md shadow-black/25">
				<img
					className="animalPicture w-96 "
					src={picture}
					alt="A cute and snuggly pet!"
				/>
				<button
					className="my-3 w-full rounded bg-stone-300 px-4 py-2 hover:bg-lime-100"
					onClick={getCat}
				>
					Get A Cat!
				</button>
				<div className="getForm w-full items-center justify-center">
					<form onSubmit={onSubmitHandler}>
						<input type="hidden" value={picture} />
						<textarea
							rows="3"
							className="block w-full rounded-lg border border-gray-300 p-2"
							type="text"
							placeholder="add a caption"
							onChange={(e) => setCaption(e.target.value)}
						/>
						<div>
							{errors && (
								<p className="ml-1 text-sm text-red-600">
									{errors.message}
								</p>
							)}
						</div>
						<div className="flex flex-row justify-center">
							<button
								className="my-3 rounded bg-stone-300 px-4 py-2 hover:bg-lime-100"
								type="submit"
							>
								Save This Kitty!
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateCat;
