import React from "react";
import Card from "./Card";

function Feed() {
	return (
		<div className="flex w-full flex-col">
			{/* feed filter */}
			<div className="flex flex-row justify-center">
				<select
					name="filters"
					id="feed-filter"
					className=" mt-6 rounded-md border-2 border-black text-xl focus:outline-none focus:ring focus:ring-black"
				>
					<option value="allPosts" selected>
						All Posts
					</option>
					<option value="myPosts" selected>
						My Posts
					</option>
					<option value="cats">Cats</option>
					<option value="dogs">Dogs</option>
				</select>
			</div>
			{/* feed filter end */}
			<div className="mt-6 flex flex-row flex-wrap justify-center">
				<Card
					postAuthor="Chris"
					postDate="12/31/22"
					postImage="https://via.placeholder.com/200x150.png"
					postContent="This is my cool cat named fred! He is pretty awesome!"
					postComments={12}
					postLikes={23}
				/>
				<Card
					postAuthor="Chris"
					postDate="12/31/22"
					postImage="https://via.placeholder.com/200x150.png"
					postContent="This is my cool cat named fred! He is pretty awesome!"
					postComments={12}
					postLikes={23}
				/>
				<Card
					postAuthor="Chris"
					postDate="12/31/22"
					postImage="https://via.placeholder.com/200x150.png"
					postContent="This is my cool cat named fred! He is pretty awesome!"
					postComments={12}
					postLikes={23}
				/>
				<Card
					postAuthor="Chris"
					postDate="12/31/22"
					postImage="https://via.placeholder.com/200x150.png"
					postContent="This is my cool cat named fred! He is pretty awesome!"
					postComments={12}
					postLikes={23}
				/>
				<Card
					postAuthor="Chris"
					postDate="12/31/22"
					postImage="https://via.placeholder.com/200x150.png"
					postContent="This is my cool cat named fred! He is pretty awesome!"
					postComments={12}
					postLikes={23}
				/>
				<Card
					postAuthor="Chris"
					postDate="12/31/22"
					postImage="https://via.placeholder.com/200x150.png"
					postContent="This is my cool cat named fred! He is pretty awesome!"
					postComments={12}
					postLikes={23}
				/>
			</div>
		</div>
	);
}

export default Feed;
