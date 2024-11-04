// UserContext.js
import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth } from "../auth/firebaseAuth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.email.split("@")[0]);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
