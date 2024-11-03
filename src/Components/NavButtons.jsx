const NavButtons = ({ componentName = "", currentPage = false }) => {
  const buttonName = componentName;
  return (
    <button
      className={`py-3 px-2
      ${
        currentPage
          ? "bg-backgroundColor hover:bg-red-300 border-2 border-buttonColor text-buttonColor"
          : "bg-buttonColor hover:bg-mutedOchre text-white"
      }  rounded-3xl active:scale-95 transition-all duration-300 text-lg shadow-md w-[100px]`}
    >
      {buttonName}
    </button>
  );
};
export default NavButtons;
