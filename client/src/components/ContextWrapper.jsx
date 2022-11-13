import React, { useState } from "react";
import MyContext from "../contexts/MyContext";

function ContextWrapper({ children }) {
	const [loaded, setLoaded] = useState(true);
	return (
		<MyContext.Provider
			value={{
				loaded,
				setLoaded,
			}}
		>
			{children}
		</MyContext.Provider>
	);
}

export default ContextWrapper;
