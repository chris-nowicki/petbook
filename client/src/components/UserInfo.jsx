import React, { useContext } from "react";
import { Avatar } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";

import MyContext from "../contexts/MyContext";

function UserInfo(props) {
	const { user, setUser, setFilter, showFilter } = useContext(MyContext);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/users/getUser", {
				withCredentials: true,
			})
			.then((res) => {
				setUser(res.data);
			})
			.catch((err) => console.log(err));
	}, [setUser]);

	return (
		<div className="flex w-full flex-col items-center p-4">
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
