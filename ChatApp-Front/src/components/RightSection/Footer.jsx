import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="w-full px-3 py-1 bg-customLightGray">
      <div className="w-full flex items-center text-3xl ">
        <div className="m-2 text-customDarkWhite">
          <MdOutlineEmojiEmotions />
        </div>
        <div className="m-2 text-customLightWhite">
          <IoMdAdd />
        </div>
        <div className="my-1 px-2 py-2 flex items-center flex-grow p-1 rounded-lg bg-[#2A3942] ">
            <input className="w-full bg-[#2A3942] text-lg  focus:outline-none" placeholder="Type a message"/>
        </div>
        <div className="m-2 text-customDarkWhite">
          <FaMicrophone />
        </div>
      </div>
    </div>
  );
};

export default Footer;
