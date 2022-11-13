import React from "react";

function Navbar() {
	return (
		<div className="flex h-24 w-full flex-row border border-red-600 justify-between items-center p-4">
			<div  className="   ">
				petbook
			</div>
			<div  className="   ">
				<button className="bg-blue-600 px-6 py-2 text-white hover:bg-purple-600"> test</button>
			</div>
		</div>
	);
}

export default Navbar;
