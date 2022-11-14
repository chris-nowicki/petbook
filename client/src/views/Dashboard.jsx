import React, { useContext } from "react";
import MyContext from "../contexts/MyContext";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserInfo from "../components/UserInfo";

function Dashboard() {
	const { loaded } = useContext(MyContext);
	return (
		<>
			{/* page will only load if user is logged in and data is loaded */}
			{loaded && (
				<>
					{/* main dashboard container */}
					<div className="container mx-auto max-w-5xl h-screen">
						<Navbar />

						{/* user bar and main dashboard viewing container */}
						<div className="flex h-full w-full flex-row">
							{/* user info container */}
							<div className="flex flex-col w-48 border border-blue-600">
								<UserInfo />
							</div>

							{/* outlet for post feed, create post, edit post, and view post */}
							<div className="flex h-full w-full flex-col border border-green-600">
								<Outlet />
							</div>
							{/* end outlet*/}
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default Dashboard;