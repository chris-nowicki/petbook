import MyContext from "../contexts/MyContext";
import React, { useState } from "react";

function ContextWrapper({ children }) {
	const [loaded, setLoaded] = useState(false);
	const [user, setUser] = useState(null);
	const [errors, setErrors] = useState([]);
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
