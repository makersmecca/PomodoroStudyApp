import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import DisplayDateTime from "./DisplayDateTime";
import CurrentUser from "./CurrentUser";
import InstallButton from "./navitems/InstallButton";
import { useLocation } from "react-router-dom";
import logoImage from "/Icons/512x512.png";

const NavLinks = ({ timerState = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(UserContext);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const location = useLocation().pathname; //url

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Toggle menu
  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center fixed sm:absolute md:top-20 top-10 right-5 md:right-20 z-20 left-4 md:left-20">
        {/* Time display */}
        <div
          className={`${
            timerState
              ? "scale-110 translate-x-1/2 md:translate-x-0"
              : "md:order-first"
          } transition-all duration-300 ease-in-out `}
        >
          <DisplayDateTime></DisplayDateTime>
        </div>

        {/* Hamburger button */}
        <div
          className={`${timerState ? "md:order-3" : ""} flex cursor-pointer`}
        >
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className={` w-8 h-8 flex flex-col items-center justify-center focus:outline-none space-y-1`}
            disabled={timerState}
          >
            <span
              className={`block w-8 h-1 bg-buttonColor rounded transition-transform duration-300 ${
                timerState ? "cursor-not-allowed bg-opacity-50" : ""
              } ${isOpen ? "rotate-45 translate-y-2 w-7" : ""}`}
            ></span>
            <span
              className={`block w-8 h-1 bg-buttonColor rounded transition-opacity duration-300 ${
                timerState ? "cursor-not-allowed bg-opacity-50" : ""
              } ${isOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-8 h-1 bg-buttonColor rounded transition-transform duration-300 ${
                timerState ? "cursor-not-allowed bg-opacity-50" : ""
              } ${isOpen ? "-rotate-45 -translate-y-2 w-7" : ""}`}
            ></span>
          </button>
        </div>
      </div>

      {/* Slide-out Menu */}
      <div
        ref={menuRef}
        className={`fixed md:top-14 top-4 right-0 w-auto xl:w-40  bg-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out z-10 rounded-3xl ${
          isOpen ? "translate-x-0 me-2 md:me-4" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start md:items-center space-y-6 px-4 pb-8 pt-6 md:pt-20">
          {currentUser === null || currentUser.photoURL === null ? (
            // <svg
            //   xmlns="http://www.w3.org/2000/svg"
            //   width="35"
            //   height="35"
            //   fill="currentColor"
            //   className="bi bi-person-circle"
            //   viewBox="0 0 16 16"
            // >
            //   <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            //   <path
            //     fillRule="evenodd"
            //     d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            //   />
            // </svg>

            <div className={`relative inline-flex items-center`}>
              <div className="absolute translate-x-2.5 translate-y-1.5 w-full h-full bg-yellow-300 rounded-full blur-[10px]"></div>
              <img src={logoImage} className="h-[35px] w-[35px] relative" />
            </div>
          ) : (
            <img
              src={`${currentUser.photoURL}`}
              height={35}
              width={35}
              className="rounded-full shadow-md shadow-gray-700"
            />
          )}

          <Link to="/" className="text-lg text-gray-800 cursor-pointer px-2">
            {currentUser ? (
              <span className="font-semibold text-buttonColor text-lg">
                Hello, {`${currentUser.displayName}`}
              </span>
            ) : (
              <span className="font-semibold text-buttonColor text-xl">
                Hi, there!
              </span>
            )}
          </Link>

          {/* PWA Install Button */}
          <InstallButton onClick={toggleMenu} />

          {location === "/" ||
          location === "/rest" ||
          location === "/breathe" ? (
            <></>
          ) : (
            <Link
              to="/"
              onClick={toggleMenu}
              className="text-lg text-gray-800 hover:text-buttonColor px-2"
            >
              Pomodoro
            </Link>
          )}
          {location !== "/customtimer" && (
            <Link
              to="/customtimer"
              onClick={toggleMenu}
              className="text-lg text-gray-800 hover:text-buttonColor px-2"
            >
              CustomTime
            </Link>
          )}

          {location !== "/todo" && (
            <Link
              to="/todo"
              onClick={toggleMenu}
              className="text-lg text-gray-800 hover:text-buttonColor px-2"
            >
              Your Tasks
            </Link>
          )}

          {location !== "/stats" && (
            <Link
              to="/stats"
              onClick={toggleMenu}
              className="text-lg text-gray-800 hover:text-buttonColor px-2"
            >
              Your Stats
            </Link>
          )}

          {currentUser ? (
            <CurrentUser />
          ) : (
            <>
              {location === "/LogIn" || location === "SignUp" ? (
                <></>
              ) : (
                <>
                  <Link
                    to="/SignUp"
                    onClick={toggleMenu}
                    className="text-lg text-gray-800 hover:text-buttonColor px-2"
                  >
                    SignUp
                  </Link>
                  <Link
                    to="/LogIn"
                    onClick={toggleMenu}
                    className="text-lg text-gray-800 hover:text-buttonColor px-2"
                  >
                    Log In
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
