import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import ContextWrapper from "./components/ContextWrapper";
import Chat from "./components/Chat";
import CreateCat from "./components/CreateCat";
import CreateDog from "./components/CreateDog";
import io from "socket.io-client";
import Feed from "./components/Feed";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
	const [socket] = useState(() => io(":8001"));

	useEffect(() => {
		console.log("Effect running");
		socket.on("Welcome", (data) => console.log(data));
		return () => socket.disconnect(true);
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<ContextWrapper>
				<Router>
					<Routes>
						<Route path='/' element={<Login />} default />
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
							{/* <Route
								path="create-post"
								index
								element={<CreatePost />}
							/>
							<Route
								path="edit-post/:id"
								index
								element={<EditPost />}
							/> */}
						</Route>

						<Route
							path="/chat"
							element={<Chat socket={socket} />}
						/>
						<Route path="/createcat" element={<CreateCat />} />
						<Route path="/createdog" element={<CreateDog />} />
						{/* END DASHBOARD ROUTE SECTION */}
					</Routes>
				</Router>
			</ContextWrapper>
		</div>
	);
}

export default App;
