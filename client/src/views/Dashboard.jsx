import React from "react";
import MyContext from "../contexts/MyContext";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
function Dashboard() {
	return (
		<>
			{/* page will only load if user is logged in and data is loaded */}
			{loaded && (
				<>
					{/* <Navbar /> */}

					{/* OUTLET FOR FEED PLACE THIS IN THE STYLING WHEREVER WE WANT THE FEED TO GO*/}
					<div>
						<Outlet />
					</div>
					{/* END OUTLET FOR FEED */}
				</>
			)}
		</>
	);
}

export default Dashboard;