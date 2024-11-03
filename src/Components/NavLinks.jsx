import { useState } from "react";
import { Link } from "react-router-dom";

const NavLinks = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Icon */}
      <div className="fixed md:top-20 top-10 right-4 md:right-20 z-20">
        <button
          onClick={toggleMenu}
          className="text-gray-800 w-8 h-8 flex flex-col items-center justify-center focus:outline-none space-y-1"
        >
          {/* Icon for hamburger or close based on menu state */}
          <span
            className={`block w-8 h-1 bg-gray-800 rounded transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2 w-7" : ""
            }`}
          ></span>
          <span
            className={`block w-8 h-1 bg-gray-800 rounded transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-8 h-1 bg-gray-800 rounded transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2 w-7" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Slide-out Menu */}
      <div
        className={`fixed top-12 right-0 md:w-1/4 w-2/3 bg-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out z-10 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start space-y-6 p-8 pt-20">
          <Link
            to="/customtimer"
            onClick={toggleMenu}
            className="text-lg text-gray-800 hover:text-blue-600"
          >
            Custom Timer
          </Link>
          <Link
            to="/rest"
            onClick={toggleMenu}
            className="text-lg text-gray-800 hover:text-blue-600"
          >
            Rest
          </Link>
          <Link
            to="/breathe"
            onClick={toggleMenu}
            className="text-lg text-gray-800 hover:text-blue-600"
          >
            Breathe
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
