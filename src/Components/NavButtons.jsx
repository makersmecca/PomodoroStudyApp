const NavButtons = ({ componentName = "", currentPage = false }) => {
  const buttonName = componentName;
  return (
    <button
      className={`py-3 
      ${
        currentPage
          ? "bg-backgroundColor border-2 border-buttonColor text-buttonColor font-semibold"
          : "bg-buttonColor hover:bg-opacity-85 text-white"
      }  rounded-3xl active:scale-95 transition-all duration-300 text-lg shadow-md w-[100px]`}
    >
      {buttonName}
    </button>
  );
};
export default NavButtons;
