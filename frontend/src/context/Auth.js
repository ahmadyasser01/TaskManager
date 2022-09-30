import { createContext,useState, } from "react";

export const AuthContext = createContext(null);

export const   UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({});
    const [auth,setAuth] = useState(false);
  
    // Login updates the user data with a name parameter
    const login = (userData) => {
      setUser(userData);
      setAuth(true);
    };
  
    // Logout updates the user data to default
    const logout = () => {
        setUser({});
        setAuth(false);
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout,auth }}>
        {children}
      </AuthContext.Provider>
    );
  }

