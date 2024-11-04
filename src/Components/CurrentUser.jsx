import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { auth } from "../auth/firebaseAuth";
import { useState, useEffect } from "react";

const CurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user.email);
        setCurrentUser(user.email.split("@")[0]);
      } else {
        console.log("User is signed out");
        setCurrentUser(null);
      }
    });
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out successfully");
        setCurrentUser(null);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  // <>
  //     {" "}
  //     <div>
  //       {currentUser != null ? (
  //         <div className="flex items-center gap-2">
  //           <span>
  //             {currentUser}{" "}
  //             <button type="button" onClick={handleSignOut}>
  //               Sign Out
  //             </button>
  //           </span>
  //         </div>
  //       ) : (
  //         ""
  //       )}
  //     </div>
  //   </>
  return (
    <>
      <div
        onClick={handleSignOut}
        className="text-lg text-gray-800 hover:text-blue-600"
      >
        Log Out
      </div>
    </>
  );
};
export default CurrentUser;
