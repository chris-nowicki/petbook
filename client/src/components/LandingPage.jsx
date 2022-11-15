import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50">
			<div className="flex flex-col rounded border border-black p-16 shadow-lg shadow-orange-400/25 bg-orange-400">
				<div className="items-right container mx-auto flex flex-row-reverse py-2">
					<Link to={"/login"}>
						<button className=" border border-black bg-orange-400 bg-black px-9 py-3 text-center text-xl text-white shadow-md shadow-black/25 hover:bg-orange-500">
							LOGIN
						</button>
					</Link>
				</div>
				<div className="align-center mx-auto  flex h-full w-full  flex-col rounded border bg-white border-black py-16 px-16 shadow-lg shadow-black/25">
					<p className="mb-5 font-serif text-2xl">
						Petbook <br />A place to share our pets
					</p>
					<Link to={"/register"}>
						<button className="  w-2/4 border border-black bg-orange-400 py-3 text-2xl text-white shadow-md shadow-black/25 hover:bg-orange-500">
							Register
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;