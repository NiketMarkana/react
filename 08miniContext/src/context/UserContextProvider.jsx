import React from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
    const [user, setUser] = React.useState(null)
    return(
        /* <UserContext.Provider value={{user, setUser}}> :- it just wraps not pass props,Instead of passing props directly to children, it provides a context value that any descendant can access using useContext */
        <UserContext.Provider value={{user, setUser}}> 
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider