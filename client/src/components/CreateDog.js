import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import MyContext from "../contexts/MyContext";

const CreateDog = () => {
	const [caption, setCaption] = useState("");
	const [picture, setPicture] = useState("");
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();
	const { user, setUser } = useContext(MyContext);

	useEffect(() => {
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
	}, []);

	useEffect(() => {
		axios
			.get("https://api.thedogapi.com/v1/images/search", {
				params: { limit: 1, size: "full" },
			})
			.then((res) => {
				setPicture(res.data[0].url);
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, [0]);

	const getDog = (e) => {
		e.preventDefault();
		axios
			.get("https://api.thedogapi.com/v1/images/search", {
				params: { limit: 1, size: "full" },
			})
			.then((res) => {
				setPicture(res.data[0].url);
				console.log(res.data);
				console.log(res.data[0].url);
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
				species: "dog",
			})
			.then((res) => {
				console.log(res);
				navigate("/dashboard/feed");
			})
			.catch((err) => {
				console.log(err);
				const errorResponse = err.response.data.errors;
				const errorArr = [];
				for (const key of Object.keys(errorResponse)) {
					errorArr.push(errorResponse[key].message);
				}
				setErrors(errorArr);
			});
	};
	return (
		<div className="App">
			{/* margarita's styling */}
			<div className="flex w-full flex-col items-center">
				<div className="mt-6 flex flex-col items-center rounded border border-black p-4 shadow-md shadow-black/25">
					<img
						className="animalPicture"
						src={picture}
						alt="A cute and snuggly pet!"
					/>

					<button
						className="my-3 w-full rounded bg-stone-300 px-4 py-2 hover:bg-orange-100"
						onClick={getDog}
					>
						Get A Dog!
					</button>
					<div className="getForm items-center justify-center">
						<form c onSubmit={onSubmitHandler}>
							{/* <label><h4>Add a caption</h4></label> */}
							{errors.map((err, index) => (
								<p key={index}>{err}</p>
							))}
							<input type="hidden" value={picture} />
							<textarea
								rows="3"
								className=" w-full rounded-lg border border-gray-300 p-2"
								type="text"
								onChange={(e) => setCaption(e.target.value)}
								placeholder="add a caption"
							/>
							<div>
								<p className="ml-1 text-sm ">
									*8 characters required
								</p>
							</div>
							<div className="flex flex-row justify-center">
								<button
									className=" my-3 rounded bg-stone-300 px-4 py-2 hover:bg-orange-100"
									type="submit"
								>
									Save This Puppers!
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			{/* <div className='Card '>
                <img className='animaPicture' src ={picture} alt= 'A cute and snuggly pet!'/>
            </div>
            <button onClick={getDog}>Get A Dog!</button>
            <div className='getForm'>
                <form onSubmit={onSubmitHandler}>
                    <label><h4>Add a caption</h4></label>
                    {errors.map((err,index)=><p key={index}>{err}</p>)}
                    <input type = 'hidden' value ={picture}/>
                    <input type = 'text' onChange={(e)=>setCaption(e.target.value)}/>
                    <div>
                        *8 characters required
                    </div>
                    <div>
                        <button type ='submit'>Save This Puppers!</button>
                    </div>
                </form>
            </div> */}
		</div>
	);
};
export default CreateDog;
