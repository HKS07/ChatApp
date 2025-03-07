import { BiMessageDetail } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Banner from "./Utils/Banner";
import {  useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDynamicActiveComponent } from "../features/slices/secondSectionSlice";

const NotificationSection = () => {
  const dispatch = useDispatch();
  const dynamicActiveComponent = useSelector(state => state.secondSection.dynamicActiveComponent);

  const [currentHovered, setCurrentHovered] = useState(undefined);
  return (
    <div className="flex flex-col justify-between py-4 w-16 bg-customGray border-r border-[#3c4850]">
      <div
        className="flex items-center text-white text-2xl mx-auto"
        onMouseEnter={() => setCurrentHovered("Chats")}
        onMouseLeave={() => setCurrentHovered("x")}
      >
        {dynamicActiveComponent === "ChatSection" ? (
          <div className="p-2 rounded-full bg-customDarkWhite cursor-pointer">
            <BiMessageDetail />
          </div>
        ) : (
          <div
            className="p-2"
            onClick={() => dispatch(setDynamicActiveComponent("ChatSection"))}
          >
            {" "}
            <BiMessageDetail />
          </div>
        )}
        {currentHovered === "Chats" && <Banner title={"Chats"} />}
      </div>

      <div className="text-white text-2xl mx-auto">
        <div
          className="flex items-center text-white text-2xl mx-auto cursor-pointer"
          onMouseEnter={() => setCurrentHovered("Settings")}
          onMouseLeave={() => setCurrentHovered("x")}
        >
          {dynamicActiveComponent === "SettingsSection" ? (
            <div className="p-2 rounded-full bg-customDarkWhite">
              <IoSettingsOutline />
            </div>
          ) : (
            <div
              className="p-2"
              onClick={() => dispatch(setDynamicActiveComponent("SettingsSection"))}
            >
              {" "}
              <IoSettingsOutline />
            </div>
          )}
          {currentHovered === "Settings" && <Banner title={"Settings"} />}
        </div>

        <div
          className="flex items-center text-white text-2xl mx-auto cursor-pointer"
          onMouseEnter={() => setCurrentHovered("Profile")}
          onMouseLeave={() => setCurrentHovered("x")}
        >
          {dynamicActiveComponent === "ProfileSection" ? (
            <div className="p-2 rounded-full bg-customDarkWhite">
              <CgProfile />
            </div>
          ) : (
            <div
              className="p-2"
              onClick={() => dispatch(setDynamicActiveComponent("ProfileSection"))}
            >
              {" "}
              <CgProfile />
            </div>
          )}
          {currentHovered === "Profile" && <Banner title={"Profile"} />}
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;
