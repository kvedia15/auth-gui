import { createContext, ReactNode, useContext, useState } from "react";
import { Optional } from "~/domain/results";
import User from "~/domain/user";
import { HttpAuthRepo } from "~/repos/authRepo/http_api";
import { InmemAuthRepo } from "~/repos/authRepo/inmem";


type AuthContextType = {
    isLoggedIn: boolean;
    user: Optional<User>; 
    login: (username: string, password: string) => Promise<Optional<User>>;
    logout: () => Promise<void>;
    validateSession: () => Promise<Optional<User>>
  };

export const AuthContext = createContext<AuthContextType | null>(null);


export const AuthRepoProvider = ({ children }: { children: ReactNode }) =>  {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<Optional<User>>(null);
    
    
    // const authRepo = new InmemAuthRepo();
    const authRepo = new HttpAuthRepo("/api/v1");


    const login = async (username: string, password: string): Promise<Optional<User>> =>  {
        try {
          const loggedInUser = await authRepo.login(username, password);
          setUser(loggedInUser);
          setIsLoggedIn(true);
          return loggedInUser
        } catch (error) {
          console.error("Invalid username or password");
          return null
        }
      };
    
      const logout = async () => {
        await authRepo.logout();
        setUser(null);
        setIsLoggedIn(false);
    };
    const validateSession = async () : Promise<Optional<User>> => {
        const loggedInUser = await authRepo.validateSession();
        if (loggedInUser == null) {
            return null
        }
        setUser(loggedInUser);
        setIsLoggedIn(true);
        return loggedInUser
    }

    


    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, validateSession }}>
          {children}
        </AuthContext.Provider>
      );

    
};

export const useAuthRepo = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthRepo must be used within AuthRepoProvider");
    }
    return context;
};
