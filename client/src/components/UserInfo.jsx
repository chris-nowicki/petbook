import React, { useContext } from "react";
import { Avatar } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";

import MyContext from "../contexts/MyContext";

function UserInfo(props) {
	const { user, setUser, setFilter, showFilter } = useContext(MyContext);
	// const {user,setUser}=props

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/users/getUser", {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.data);
				setUser(res.data);
			})
			.catch((err) => console.log(err));
	}, [setUser]);

	return (
		<div className="flex w-full flex-col items-center p-4">
			{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg> */}
			<Avatar src="/broken-image.jpg" sx={{ width: 72, height: 72 }} />
			<p className="mt-3">
				{user.firstName} {user.lastName}
			</p>

			{showFilter && (
				<div className="mt-6 flex flex-col items-center rounded border border-orange-400 p-2 shadow shadow-black/25">
					<h1 className="text-lg">Feed Filter</h1>
					<select
						name="filters"
						id="feed-filter"
						className="text-md form-select mt-2 rounded-md border border-black shadow shadow-black/25 focus:outline-none
							focus:ring-1 focus:ring-black"
						defaultValue="allPosts"
						onChange={(e) => setFilter(e.target.value)}
					>
						<option value="allPosts">All Posts</option>
						<option value="myPosts">My Posts</option>
						<option value="cat">Cats</option>
						<option value="dog">Dogs</option>
					</select>
				</div>
			)}
		</div>
	);
}

export default UserInfo;
