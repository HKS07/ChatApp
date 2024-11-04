import { IoIosSearch } from "react-icons/io";
import UserLable from "./UsersLabel";

const ChatSection = () => {
  return (
    <div className="w-[446px] bg-customBlack text-white">
      <div className="text-2xl font-bold mx-5 my-2 py-2">Chats</div>
      <div className="flex px-1 py-2 mx-2 my-1 rounded-lg bg-customLightGray">
        <div className="mx-2 text-2xl text-customDarkWhite">
          <IoIosSearch />
        </div>
        <input
          className="mx-2 bg-customLightGray text-customDarkWhite w-full focus:outline-none"
          placeholder="Search"
        />
      </div>
      <div className="flex px-1 py-2 mx-2 mt-1">
        <div className="mr-2 px-2 py-1 rounded-xl bg-customLightGray text-customDarkWhite">
          All
        </div>
        <div className="mr-2 px-2 py-1 rounded-xl bg-customLightGray text-customDarkWhite">
          Unread
        </div>
        <div className="mr-2 px-2 py-1 rounded-xl bg-customLightGray text-customDarkWhite">
          Favourites
        </div>
      </div>
      <div className="max-h-[580px] overflow-y-scroll custom-scrollbar">
        <UserLable />
        <UserLable />
        <UserLable />
        <UserLable />
        <UserLable />
        <UserLable />
        <UserLable />
        <UserLable />
        <UserLable />
        <UserLable />
      </div>
    </div>
  );
};

export default ChatSection;
