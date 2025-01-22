import { IoClose } from "react-icons/io5";
import Profile from "../../assets/Profile.png";
import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setActiveChatExtendedSection } from "../../features/slices/globalSlice";
// import { IoHeartDislikeOutline } from "react-icons/io5";

const ContactProfile = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-[446px] bg-[#0C1317]">
      <div className="flex items-center gap-8 bg-customBlack">
        <div
          className="text-2xl text-customDarkWhite m-5 cursor-pointer"
          onClick={() => dispatch(setActiveChatExtendedSection(""))}
        >
          <IoClose />
        </div>
        <div className="flex-grow text-customLightWhite text-xl">
          Contact info
        </div>
      </div>

      <div className="flex flex-col items-center  bg-customBlack">
        <img src={Profile} className="rounded-full w-48 my-6" />
        <div className="flex flex-col items-center mb-6">
          <p className="text-customLightWhite text-xl">HKS Office</p>
          <p className="text-customDarkWhite">+91 99999 99999</p>
        </div>
      </div>

      <div className="flex flex-col my-3 py-3 px-4 bg-customBlack">
        <div className="text-customDarkWhite">About</div>
        <div className="text-lg text-customLightWhite">Silent</div>
      </div>

      <div className="flex flex-col my-3 px-6 pt-2 bg-customBlack">
        <div className="flex items-center gap-4 py-2">
          <div className="text-xl text-customDarkWhite">
            <FaRegHeart />
          </div>
          <div className="text-lg text-customLightWhite">Add to favourites</div>
        </div>

        <div className="flex items-center gap-4 py-2">
          <div className="text-xl text-red-400">
            <MdBlock />
          </div>
          <div className="text-lg text-red-400">Block HKS Office</div>
        </div>

        <div className="flex items-center gap-4 py-2">
          <div className="text-xl text-red-400">
            <RiDeleteBin6Line />
          </div>
          <div className="text-lg text-red-400">Delete chat</div>
        </div>
      </div>
    </div>
  );
};

export default ContactProfile;
