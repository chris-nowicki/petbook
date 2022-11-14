import MyContext from "../contexts/MyContext";
import React, { useState } from "react";

function ContextWrapper({ children }) {
	const [loaded, setLoaded] = useState(false);
	const [user, setUser] = useState([]);
	const [errors, setErrors] = useState(false);
	return (
		<MyContext.Provider
			value={{
				user,
				setUser,
				loaded,
				setLoaded,
				errors,
				setErrors
			}}
		>
			{children}
		</MyContext.Provider>
	);
}

export default ContextWrapper;
