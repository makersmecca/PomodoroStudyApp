const NavButtons = ({
  componentName = "",
  currentPage = false,
  timerState = false,
}) => {
  const buttonName = componentName;
  return (
    <button
      className={`py-3 ${timerState ? "cursor-not-allowed opacity-50" : ""} 
      ${
        currentPage
          ? "bg-backgroundColor border-2 border-buttonColor text-buttonColor font-semibold"
          : "bg-buttonColor text-white"
      }  rounded-3xl active:scale-95 transition-all duration-300 text-lg shadow-md w-[100px] hover:bg-opacity-85`}
      disabled={timerState}
    >
      {buttonName}
    </button>
  );
};

export default NavButtons;
