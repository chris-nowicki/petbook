import React from "react";
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

function Navbar() {
	const navigate = useNavigate()

	const logout = (e) =>{
		axios.post('http://localhost:8000/api/users/logout',
			{withCredentials:true})
		.then((res)=>{
			console.log('logged out')
			navigate("/")
		}).catch((err)=>{
			console.log(err)
		})
	}
	return (
		<div className="flex h-24 w-full flex-row border border-red-600 justify-between items-center p-4 bg-orange-400">
			<div  className="basis -1/4">
				<h1 className="font-mono text-orange-50 text-2xl" >PetBook</h1>
			</div>
			<div className="flex justify-end">
						<button className="bg-orange-50 px-6 py-2 text-orange-900 hover:bg-lime-100 rounded  border-orange-900">
							create post</button>
					<button onClick={logout}
							className="bg-orange-50 px-6 py-2 text-orange-900 hover:bg-lime-100 ml-3 border-orange-900 rounded"> 
							logout</button>

			</div>
		</div>
	);
}

export default Navbar;
