import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import DisplayDateTime from "./DisplayDateTime";
import CurrentUser from "./CurrentUser";
const NavLinks = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser } = useContext(UserContext);
  // currentUser !== null &&
  //   Object.entries(currentUser).forEach(([key, value]) => {
  //     console.log(`${key}: ${value}`);
  //   });

  // Toggle menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // fixed md:top-20 top-10 right-4 md:right-20 z-20
  return (
    <>
      {/* Hamburger Icon */}
      <div className="flex justify-between md:justify-end items-center fixed sm:absolute md:top-20 top-10 right-4 md:right-20 z-20 left-4 md:left-20">
        {/* Time display - adjusted for widescreen */}
        <div className="md:order-2 md:mr-20">
          <DisplayDateTime></DisplayDateTime>
        </div>

        {/* Hamburger button */}
        <div className="md:order-3 flex">
          <button
            onClick={toggleMenu}
            className="w-8 h-8 flex flex-col items-center justify-center focus:outline-none space-y-1"
          >
            <span
              className={`block w-8 h-1 bg-buttonColor rounded transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-2 w-7" : ""
              }`}
            ></span>
            <span
              className={`block w-8 h-1 bg-buttonColor rounded transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-8 h-1 bg-buttonColor rounded transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2 w-7" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Slide-out Menu */}
      <div
        className={`fixed md:top-14 top-4 right-0 md:w-auto w-auto  bg-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out z-10 rounded-3xl ${
          isOpen ? "translate-x-0 me-2 md:me-4" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start md:items-center space-y-6 md:px-6 px-8 pb-8 pt-7 md:pt-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
          <div className="text-lg text-gray-800 hover:text-blue-600">
            {currentUser ? `Hello, ${currentUser.displayName}!` : "Hello!"}
          </div>
          <Link
            to="/customtimer"
            onClick={toggleMenu}
            className="text-lg text-gray-800 hover:text-blue-600"
          >
            Custom Timer
          </Link>
          <Link
            to="/todo"
            onClick={toggleMenu}
            className="text-lg text-gray-800 hover:text-blue-600"
          >
            Your Tasks
          </Link>
          <Link
            to="/SignUp"
            onClick={toggleMenu}
            className="text-lg text-gray-800 hover:text-blue-600"
          >
            SignUp
          </Link>
          {currentUser ? (
            <CurrentUser />
          ) : (
            <Link
              to="/LogIn"
              onClick={toggleMenu}
              className="text-lg text-gray-800 hover:text-blue-600"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavLinks;
