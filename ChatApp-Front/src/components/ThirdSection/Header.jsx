import { CgProfile } from "react-icons/cg";
import { GoDeviceCameraVideo } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";

const Header = () => {
  return (
    <div className="relative top-0 flex w-full bg-customGray">
      <div className="mx-3 my-2 text-4xl text-customLightWhite">
        <CgProfile />
      </div>
      <div className="flex flex-grow items-center text-customLightWhite">
        HKS Office
      </div>
      <div className="flex my-1 mx-4 items-center text-customDarkWhite text-2xl">
        <div className="p-2"><GoDeviceCameraVideo/></div>
        <div className="p-2"><IoIosSearch/></div>
        <div className="p-2"><BsThreeDotsVertical/></div>
      </div>
    </div>
  );
};

export default Header;
