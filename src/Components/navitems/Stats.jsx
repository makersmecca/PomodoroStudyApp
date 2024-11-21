import { useEffect, useState, useContext } from "react";
import { db } from "../../auth/firebaseAuth";
import { doc, getDoc } from "firebase/firestore";
import { UserContext } from "../UserContext";
import NavLinks from "../NavLinks";
import { Link } from "react-router-dom";

const Stats = () => {
  const { currentUser } = useContext(UserContext);
  const [statsData, setStatsData] = useState([]); // Add state to store the data
  const [isLoading, setIsLoading] = useState(true);

  const tableData = {
    custom: "Custom Timer",
    pomodoro: "Focus Session",
    rest: "Rest Session",
  };

  useEffect(() => {
    if (currentUser) {
      fetchData(currentUser.email);
    }
  }, [currentUser]);

  const fetchData = async (email) => {
    setIsLoading(true);
    try {
      if (!email) return;
      const docRef = doc(db, "userstats", email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const dataArray = Object.entries(data).map(
          ([component, timeDuration]) => ({
            component,
            timeDuration,
          })
        );
        setStatsData(dataArray); // Save the data in state
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between w-full items-center p-4">
        <NavLinks />
      </div>
      {!currentUser ? (
        <div className="flex-grow flex flex-col items-center justify-center top-1/2">
          <span className="text-xl font-semibold">
            Uh Oh! You're not logged in yet!
          </span>
          <Link to="/LogIn" className="text-xl font-semibold">
            <span className="underline">Log in</span> to continue.
          </Link>
        </div>
      ) : (
        <>
          <div className="self-center w-80 sm:w-10/12 max-w-md mt-52 rounded-lg shadow-md overflow-hidden">
            {" "}
            {/* Added mt-24 to account for fixed input */}
            <div className="text-xl md:text-2xl flex justify-between items-center p-4 bg-buttonColor text-white">
              <div>
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    className="bi bi-arrow-left-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                  </svg>
                </Link>
              </div>
              <div className="flex-1 text-center">Your Stats</div>
              <div className="invisible">{"<-"}</div>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center p-4">
                <svg
                  className="animate-spin me-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Loading Stats</span>
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center bg-pastelYellow justify-center pb-4">
                <div className="overflow-x-auto max-w-4xl mx-auto  mt-8 rounded-xl">
                  <table className="w-full bg-white">
                    <thead className="sticky top-0 bg-accentColorLightCream">
                      <tr className="">
                        <th className="px-6 py-3 border-b text-left text-lg md:text-2xl">
                          Activity
                        </th>
                        <th className="px-6 py-3 border-b text-center text-lg md:text-2xl">
                          Time Spent
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {statsData.map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-accentColorLightCream transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4 border-b text-left font-semibold text-md md:text-xl cursor-pointer">
                            {tableData[item.component]}
                          </td>
                          <td className="px-6 py-4 border-b text-center font-semibold text-md md:text-xl cursor-pointer">
                            {item.timeDuration}
                          </td>
                        </tr>
                      ))}
                      {statsData.length === 0 && (
                        <tr>
                          <td
                            colSpan="2"
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Stats;
