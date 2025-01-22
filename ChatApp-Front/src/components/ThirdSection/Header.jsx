import { GoDeviceCameraVideo } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useContext } from "react";
import { SecondSectionContext } from "../../context/SecondSection";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChatExtendedSection } from "../../features/slices/globalSlice";

const Header = () => {
  const dispatch = useDispatch();
  // const { currentConversationUser } = useContext(SecondSectionContext);
  const currentConversationUser = useSelector(state => state.secondSection.currentConversationUser)

  return (
    <div className="relative top-0 flex w-full bg-customGray">
      <div
        className="mx-3 my-3 text-4xl text-customLightWhite cursor-pointer"
        onClick={() => {
          dispatch(setActiveChatExtendedSection("ContactProfile"));
        }}
      >
        <img
          src={currentConversationUser?.profileUrl}
          alt=""
          className="w-10 h-10"
        />
      </div>
      <div
        className="flex flex-grow items-center text-customLightWhite cursor-pointer"
        onClick={() => {
          dispatch(setActiveChatExtendedSection("ContactProfile"));
        }}
      >
        {currentConversationUser?.username}
      </div>
      <div className="flex my-1 mx-4 items-center text-customLightWhite text-2xl">
        <div className="p-2">
          <GoDeviceCameraVideo />
        </div>
        <div className="p-2">
          <div className="p-2 hover:bg-customDarkWhite hover:rounded-full">
            <IoIosSearch
              onClick={() => {
                dispatch(setActiveChatExtendedSection("SearchMessage"));
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
