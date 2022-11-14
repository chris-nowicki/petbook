import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContextWrapper from "./components/ContextWrapper";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
	return (
		<div>
			<ContextWrapper>
				<Router>
					<Routes>
						{/* <Route path='/' element={<LandingPage />} default /> */}
						 <Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} /> 

						{/* the following route is for the dashboard.  Whatever is in the path is what loads in the OUTLET 
            SECTION of Dashboard.jsx */}
						{/* <Route path="/dashboard" element={<Dashboard />}>
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
								path="edit-post/:id"
								index
								element={<EditPost />}
							/>
						</Route> */}
						{/* END DASHBOARD ROUTE SECTION */}
					</Routes>
				</Router>
			</ContextWrapper>
		</div>
	);
}

export default App;
