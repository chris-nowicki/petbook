import React, { useEffect, useContext, useState } from "react";
import MyContext from "../contexts/MyContext";
import Card from "./Card";
import axios from "axios";
import { Alert } from "@mui/material";

function Feed() {
	const { user, setUser } = useContext(MyContext);
	const [posts, setPosts] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [filter, setFilter] = useState("all posts")

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/posts", {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.data);
				setPosts(res.data);
				setFilter("allposts")
				setLoaded(true);
			})
			.catch((err) => {
				console.log(err);
				setLoaded(false);
			});

		// eslint-disable-next-line
	}, []);

	let filteredPosts = [...posts]
	if (filter === "allposts") {
		filteredPosts = [...posts]
	} else if (filter === "cat") {
		filteredPosts = filteredPosts.filter((post) => post.species === 'cat')
	} else if (filter === "dog") {
		filteredPosts = filteredPosts.filter((post) => post.species === 'dog')
	} else {
		console.log(user._id)
		filteredPosts = filteredPosts.filter((post) => post.author_id === user._id)
		console.log(filteredPosts)
	}
	

	return (
		<div className="flex w-full flex-col items-center">
			{loaded && (
				<>
					<div className="flex flex-row justify-center">
						<select
							name="filters"
							id="feed-filter"
							className=" mt-6 rounded-md border-2 border-black text-xl focus:outline-none focus:ring focus:ring-black"
							defaultValue="allposts"
							onChange={(e) => setFilter(e.target.value)}
						>
							<option value="allPosts">All Posts</option>
							<option value="myPosts">My Posts</option>
							<option value="cat">Cats</option>
							<option value="dog">Dogs</option>
						</select>
					</div>
					{/* feed filter end */}

					<div className="mt-6 flex flex-row flex-wrap justify-center">
						{filteredPosts.map((post) => (
							<Card
								key={post._id}
								authorName={post.authorName}
								postDate={post.createdAt}
								postImage={post.postImage}
								postContent={post.content}
								postComments={post.comments.length}
								postLikes={post.likes.length}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default Feed;
