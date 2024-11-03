import { useState } from "react";
import { Link } from "react-router-dom";
import DisplayDateTime from "./DisplayDateTime";
const NavLinks = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <div className="md:order-3">
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
        className={`fixed md:top-14 top-5 right-0 md:w-auto w-auto  bg-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out z-10 rounded-3xl ${
          isOpen ? "translate-x-0 md:me-4" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start md:items-center space-y-6 p-8 pt-20">
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
            ToDo
          </Link>
          <Link
            to="/stats"
            onClick={toggleMenu}
            className="text-lg text-gray-800 hover:text-blue-600"
          >
            Stats
          </Link>
          <Link
            to="/settings"
            onClick={toggleMenu}
            className="text-lg text-gray-800 hover:text-blue-600"
          >
            Settings
          </Link>
          <Link
            to="/SignUp"
            onClick={toggleMenu}
            className="text-lg text-gray-800 hover:text-blue-600"
          >
            SignUp
          </Link>
          <Link
            to="/LogIn"
            onClick={toggleMenu}
            className="text-lg text-gray-800 hover:text-blue-600"
          >
            LogIn
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavLinks;
