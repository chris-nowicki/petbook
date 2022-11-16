import React, { useEffect, useContext, useState } from "react";
import MyContext from "../contexts/MyContext";
import Card from "./Card";
import axios from "axios";

function Feed() {
	const { user, filter, setShowFilter } = useContext(MyContext);
	const [posts, setPosts] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setShowFilter(true)
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

	// post filters
	let filteredPosts = [...posts];
	if (filter === "allPosts") {
		filteredPosts = [...posts];
	} else if (filter === "cat") {
		filteredPosts = filteredPosts.filter((post) => post.species === "cat");
	} else if (filter === "dog") {
		filteredPosts = filteredPosts.filter((post) => post.species === "dog");
	} else {
		filteredPosts = filteredPosts.filter(
			(post) => post.author_id === user._id
		);
	}

	return (
		<div className="flex w-full flex-col items-center">
			{loaded && (
				<>
					<div className="mt-6 flex flex-row flex-wrap justify-center">
						{filteredPosts.map((post) => (
						
								<Card
									key={post._id}
									postId={post._id}
									authorName={post.authorName}
									postDate={post.createdAt}
									postImage={post.postImage}
									postContent={post.content}
									postComments={post.comments.length}
									postLikes={post.likes.length}
									userProps={user._id}
									likeProps={post.likes}
								/>
						
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default Feed;
