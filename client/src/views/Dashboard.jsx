import React, { useContext, useEffect } from "react";
import MyContext from "../contexts/MyContext";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserInfo from "../components/UserInfo";
import axios from "axios";

function Dashboard() {
	const { setUser, loaded, setLoaded } = useContext(MyContext);
	const navigate = useNavigate();

	useEffect(() => {
		// redirect /dashboard to /feed
		if (
			window.location.href === "http://localhost:3000/dashboard" ||
			window.location.href === "http://localhost:3000/dashboard/"
		) {
			navigate("feed");
		}
		axios
			.get("http://localhost:8000/api/users/getUser", {
				withCredentials: true,
			})
			.then((res) => {
				setUser(res.data);
				setLoaded(true);
			})
			.catch((err) => {
				setLoaded(false);
				navigate("/");
			});

		// eslint-disable-next-line
	}, []);

	return (
		<>
			{/* page will only load if user is logged in and data is loaded */}
			{loaded && (
				<>
					{/* main dashboard container */}
					<div className="container mx-auto max-w-5xl shadow-lg shadow-black/25">
						<Navbar />

						{/* user bar and main dashboard viewing container */}
						<div className="flex h-full w-full flex-row">
							{/* user info container */}
							<div className="flex w-48 flex-col bg-gray-200">
								<UserInfo />
							</div>

							{/* outlet for post feed, create post, edit post, and view post */}

							<div className="flex h-full w-full flex-col bg-white">
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
