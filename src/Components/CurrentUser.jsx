import { getAuth, signOut } from "firebase/auth";
import { auth } from "../auth/firebaseAuth";

const CurrentUser = () => {
  getAuth();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return (
    <>
      <div
        onClick={handleSignOut}
        className="text-lg text-gray-800 hover:text-buttonColor cursor-pointer px-2"
      >
        Log Out
      </div>
    </>
  );
};
export default CurrentUser;
