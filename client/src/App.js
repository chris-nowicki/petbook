import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import ContextWrapper from "./components/ContextWrapper";
import Chat from "./components/Chat";
import CreateCat from "./components/CreateCat";
import CreateDog from "./components/CreateDog";
import io from "socket.io-client";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";

import Register from "./components/Register";
import Feed from "./components/Feed";
import CreatePost from "./components/CreatePost";
import ViewOne from "./components/ViewOne";

function App() {
	const [socket] = useState(() => io(":8001"));

	useEffect(() => {
		console.log("Effect running");
		socket.on("Welcome", (data) => console.log(data));
		return () => socket.disconnect(true);
	}, []);

	return (
		<div>
			<ContextWrapper>
				<Router>
					<Routes>
						<Route path="/" element={<LandingPage />} default />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />

						{/* the following route is for the dashboard.  Whatever is in the path is what loads in the OUTLET 
            			SECTION of Dashboard.jsx */}
						<Route path="/dashboard" element={<Dashboard />}>
							<Route
								path="feed"
								index
								element={<Feed />}
								default
							/>
							<Route
								path="create-post"
								index
								element={<CreatePost />}
							/>
							<Route
								path="create-cat"
								index
								element={<CreateCat />}
							/>
							<Route
								path="create-dog"
								index
								element={<CreateDog />}
							/>
							<Route
								path="/dashboard/view-one/:id"
								element={<ViewOne />}
							/>
						</Route>
						{/* END DASHBOARD ROUTE SECTION */}
					</Routes>
				</Router>
			</ContextWrapper>
		</div>
	);
}

export default App;
