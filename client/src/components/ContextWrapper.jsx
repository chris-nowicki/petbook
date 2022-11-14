import MyContext from "../contexts/MyContext";
import React, { useState, useEffect } from "react";

function ContextWrapper({ children }) {
	const [loaded, setLoaded] = useState(true);
	const [user, setUser] = useState({});
  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        loaded,
				setLoaded,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default ContextWrapper;