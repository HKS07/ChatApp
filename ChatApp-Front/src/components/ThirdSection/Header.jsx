import { CgProfile } from "react-icons/cg";
import { GoDeviceCameraVideo } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useContext } from "react";
import GlobalContext from "../Utils/GlobalContext";

const Header = () => {
  const { activeChatExtendedSection, setActiveChatExtendedSection } =
    useContext(GlobalContext);

  return (
    <div className="relative top-0 flex w-full bg-customGray">
      <div
        className="mx-3 my-2 text-4xl text-customLightWhite cursor-pointer"
        onClick={() => {
          setActiveChatExtendedSection("ContactProfile");
        }}
      >
        <CgProfile />
      </div>
      <div
        className="flex flex-grow items-center text-customLightWhite cursor-pointer"
        onClick={() => {
          setActiveChatExtendedSection("ContactProfile");
        }}
      >
        HKS Office
      </div>
      <div className="flex my-1 mx-4 items-center text-customLightWhite text-2xl">
        <div className="p-2">
          <GoDeviceCameraVideo />
        </div>
        <div className="p-2">
          <div className="hover:bg-customDarkWhite hover:rounded-full">
          <IoIosSearch
            onClick={() => {
              setActiveChatExtendedSection("SearchMessage");
            }}
          />
          </div>
        </div>
        <div className="p-2">
          <BsThreeDotsVertical />
        </div>
      </div>
    </div>
  );
};

export default Header;
