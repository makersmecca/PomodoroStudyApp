// UserContext.js
import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
// import { auth } from "../auth/firebaseAuth";
import { getAuthInstance } from "../auth/firebaseAuth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    email: null,
    uid: null,
    displayName: null,
    photoURL: null,
  });

  useEffect(() => {
    const setupFirebase = async () => {
      const auth = await getAuthInstance();
      getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          user.displayName === null
            ? setCurrentUser({
                email: user.email,
                uid: user.uid,
                displayName: user.email.substring(0, 5),
                photoURL: null,
              })
            : setCurrentUser({
                email: user.email,
                uid: user.uid,
                displayName: user.displayName.split(" ")[0],
                photoURL: user.photoURL,
              });
        } else {
          setCurrentUser(null);
        }
      });
    };
    setupFirebase();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
