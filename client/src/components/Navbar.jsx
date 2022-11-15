import React, { useContext } from "react";
import MyContext from "../contexts/MyContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PetsIcon from "@mui/icons-material/Pets";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function Navbar() {
	const { setUser, setLoaded } = useContext(MyContext);
	const navigate = useNavigate();

	const handleLogOut = () => {
		axios
			.post(
				"http://localhost:8000/api/users/logout",
				{},
				{ withCredentials: true }
			)
			.then((res) => {
				setUser(null);
				setLoaded(false);
				navigate("/");
			})
			.catch((err) => console.log(err));
	};


	return (
		<div className="z-50 flex h-24 w-full flex-row items-center justify-between bg-orange-400 p-4 shadow-md shadow-black/25">
			<div className="flex flex-row items-center">
				<PetsIcon fontSize="large" sx={{ color: "white" }} />
				<h1 className=" ml-2 mt-1 font-mono text-3xl text-orange-50">
					PetBook
				</h1>
			</div>
			<div className="flex flex-row items-center">
				<button className="flex flex-row items-center rounded border-orange-900 bg-orange-50  px-4 py-2 text-orange-900 hover:bg-lime-100">
					<AddCircleOutlineIcon />{" "}
					<span className="ml-1">create post</span>
				</button>

				<button
					className="ml-3 flex flex-row items-center rounded border-orange-900 bg-orange-50 px-4 py-2 text-orange-900 hover:bg-lime-100"
					onClick={() => handleLogOut()}
				>
					<span className="mr-1">logout</span> <LogoutIcon />
				</button>
			</div>
		</div>
	);
}

export default Navbar;
