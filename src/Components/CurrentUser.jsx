import { getAuth, signOut } from "firebase/auth";
// import { auth } from "../auth/firebaseAuth";
import { getAuthInstance } from "../auth/firebaseAuth";
import { useEffect } from "react";

const CurrentUser = () => {
  let auth = null;
  useEffect(() => {
    const setupFirebase = async () => {
      auth = await getAuthInstance();
      getAuth();
    };
    setupFirebase();
  }, []);

  const handleSignOut = () => {
    if (auth) {
      auth
        .signOut()
        .then(() => {
          console.log("User signed out successfully");
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });
    }
  };
  return (
    <>
      <div
        onClick={handleSignOut}
        className="text-lg text-gray-800 hover:text-buttonColor cursor-pointer"
      >
        Log Out
      </div>
    </>
  );
};
export default CurrentUser;
