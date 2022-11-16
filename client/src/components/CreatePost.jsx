import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../contexts/MyContext";

const CreatePost = () => {
	const { setShowFilter } = useContext(MyContext);

	setShowFilter(false);

	return (
		<div className="justify-top mt-10 flex h-screen w-full flex-col items-center">
			<p className=" my-3 text-2xl font-semibold">Create Post</p>
			<div className="flex  flex-col  justify-between">
				<Link to={"/dashboard/create-dog"}>
					<button className="my-3 w-32 rounded bg-stone-300 px-4 py-2">
						Dog
					</button>
				</Link>

				<Link to={"/dashboard/create-cat"}>
					<button
						className="w-32 rounded bg-stone-300 px-4 py-2"
						rounded
					>
						Cat
					</button>
				</Link>
			</div>
		</div>
	);
};

export default CreatePost;
