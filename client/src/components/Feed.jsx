import React, { useEffect, useContext, useState } from "react";
import MyContext from "../contexts/MyContext";
import Card from "./Card";
import axios from "axios";

function Feed() {
	const { user, setUser } = useContext(MyContext);
	const [posts, setPosts] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/posts", {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.data);
				setPosts(res.data);
				setLoaded(true);
			})
			.catch((err) => {
				console.log(err);
				setLoaded(false);
			});

		// eslint-disable-next-line
	}, []);

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
						>
							<option value="allPosts">All Posts</option>
							<option value="myPosts">My Posts</option>
							<option value="cats">Cats</option>
							<option value="dogs">Dogs</option>
						</select>
					</div>
					{/* feed filter end */}

					<div className="mt-6 flex flex-row flex-wrap justify-center">
						{posts.map((post) => (
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
