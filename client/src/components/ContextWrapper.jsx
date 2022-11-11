import React from "react";
import MyContext from "../contexts/MyContext";

function ContextWrapper({ children }) {

	return (
		<MyContext.Provider
			value={{
			
			}}
		>
			{children}
		</MyContext.Provider>
	);
}

export default ContextWrapper;
