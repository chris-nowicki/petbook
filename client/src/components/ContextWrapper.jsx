import MyContext from "../contexts/MyContext";
import React, { useState, useEffect } from "react";


function ContextWrapper({ children }) {
	const [user, setUser] = useState({});
  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default ContextWrapper;
