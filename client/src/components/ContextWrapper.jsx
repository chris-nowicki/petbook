import MyContext from "../contexts/MyContext";
import React, { useState } from "react";

function ContextWrapper({ children }) {
	const [loaded, setLoaded] = useState(false);
	const [user, setUser] = useState(null);
	const [errors, setErrors] = useState([]);
	const [filter, setFilter] = useState("allPosts")
	return (
		<MyContext.Provider
			value={{
				user,
				setUser,
				loaded,
				setLoaded,
				errors,
				setErrors,
				filter,
				setFilter
			}}
		>
			{children}
		</MyContext.Provider>
	);
}

export default ContextWrapper;
