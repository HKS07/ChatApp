import { IoClose } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { useContext } from "react";
import GlobalContext from "../Utils/GlobalContext";

const SearchMessage = () => {
  const {setActiveChatExtendedSection} = useContext(GlobalContext);
  return (
    <div className="w-[446px] bg-customBlack">
      <div className="flex items-center m-5 gap-8">
        <div className="text-2xl text-customDarkWhite cursor-pointer" onClick={() => setActiveChatExtendedSection('')}>
          <IoClose />
        </div>
        <div className="flex-grow text-customLightWhite text-xl">
          Search Message
        </div>
      </div>
      <div className="flex items-center mx-4 gap-2">
        <div className="text-2xl text-customDarkWhite ">
          <SlCalender />
        </div>
        <div className="flex-grow flex px-1 py-2 mx-2 my-1 rounded-lg bg-customLightGray">
          <div className="mx-2 text-2xl text-customDarkWhite">
            <IoIosSearch />
          </div>
          <input
            className="mx-2 bg-customLightGray text-customDarkWhite w-full focus:outline-none"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex justify-center items-center min-h-40 text-customDarkWhite text-sm">Search for messages with HKS Office</div>
    </div>
  );
};

export default SearchMessage;
