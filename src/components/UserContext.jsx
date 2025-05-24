import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);    

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initialize user state to null

    return (
        <UserContext.Provider value={{ user, setUser  }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    return useContext(UserContext); // Custom hook to access user context
}   


