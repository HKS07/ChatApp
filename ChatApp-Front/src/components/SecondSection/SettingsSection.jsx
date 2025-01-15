import { IoIosSearch } from "react-icons/io";
import ProfileImg from "../../assets/Profile.png";
import { IoIosLogOut } from "react-icons/io";
import { AccountContext } from "../../context/AccountProvider";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { setOAuthInfo } from "../../features/accountSlice";
// import { CgProfile } from "react-icons/cg";
// import { MdLockOutline } from "react-icons/md";
// import { BiMessageDetail } from "react-icons/bi";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import UnderConstructionWrapper from "../Utils/UnderConstructionWrapper";

const SettingsLabel = ({ children, title, onClickFunction }) => {
  const textColor = title === "Log out" ? "text-red-500" : "text-customWhite";
  return (
    <div
      className="flex hover:bg-customDarkWhite2 cursor-pointer"
      onClick={() => onClickFunction()}
    >
      <div className={`text-2xl ${textColor} m-5`}>{children}</div>
      <div
        className={`flex-grow flex items-center text-lg ${textColor} border-b border-customDarkWhite2`}
      >
        <p>{title}</p>
      </div>
    </div>
  );
};

const SettingsSection = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(setOAuthInfo(undefined));
  };
  return (
    <div className="w-[446px] bg-customBlack text-white">
      <div className="text-2xl font-bold mx-5 my-2 py-2">Settings</div>
      <div className="flex px-1 py-2 mx-2 my-1 rounded-lg bg-customLightGray">
        <div className="mx-2 text-2xl text-customDarkWhite">
          <IoIosSearch />
        </div>
        <input
          className="mx-2 bg-customLightGray text-customDarkWhite w-full focus:outline-none"
          placeholder="Search settings"
        />
      </div>
      <div className="flex">
        <div className="mx-3 my-2">
          <img src={ProfileImg} className="w-24 rounded-full" />
        </div>
        <div className="w-full flex flex-col justify-center ">
          <p className="mr-3 text-customLightWhite">HKS</p>
          <p className="mr-3 text-customDarkWhite">KuchBhi</p>
        </div>
      </div>
      {/* <SettingsLabel title={"Account"}><CgProfile/></SettingsLabel>
      <SettingsLabel title={"Privacy"}><MdLockOutline/></SettingsLabel>
      <SettingsLabel title={"Chats"}><BiMessageDetail/></SettingsLabel>
      <SettingsLabel title={"Notifications"}><IoMdNotificationsOutline/></SettingsLabel> */}
      <SettingsLabel title={"Log out"} onClickFunction={handleLogout}>
        <IoIosLogOut />
      </SettingsLabel>
    </div>
  );
};

export default SettingsSection;
