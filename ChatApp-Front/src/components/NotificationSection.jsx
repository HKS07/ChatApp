import { BiMessageDetail } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Banner from "./Utils/Banner";
import { useState } from "react";
const NotificationSection = ({ activeComponent, onComponentChange }) => {
  const [currentHovered, setCurrentHovered] = useState("x");
  return (
    <div className="flex flex-col justify-between py-4 w-16 bg-customGray">
      <div
        className="flex items-center text-white text-2xl mx-auto"
        onMouseEnter={() => setCurrentHovered("Chats")}
        onMouseLeave={() => setCurrentHovered("x")}
      >
        {activeComponent === "ChatSection" ? (
          <div className="p-2 rounded-full bg-customDarkWhite">
            <BiMessageDetail />
          </div>
        ) : (
          <div className="p-2" onClick={() => onComponentChange("ChatSection")}>
            {" "}
            <BiMessageDetail />
          </div>
        )}
        {currentHovered === "Chats" && <Banner title={"Chats"} />}
      </div>

      <div className="text-white text-2xl mx-auto">
        <div
          className="flex items-center text-white text-2xl mx-auto"
          onMouseEnter={() => setCurrentHovered("Settings")}
          onMouseLeave={() => setCurrentHovered("x")}
        >
          {activeComponent === "SettingsSection" ? (
            <div className="p-2 rounded-full bg-customDarkWhite">
              <IoSettingsOutline />
            </div>
          ) : (
            <div
              className="p-2"
              onClick={() => onComponentChange("SettingsSection")}
            >
              {" "}
              <IoSettingsOutline />
            </div>
          )}
          {currentHovered === "Settings" && <Banner title={"Settings"} />}
        </div>

        <div
          className="flex items-center text-white text-2xl mx-auto"
          onMouseEnter={() => setCurrentHovered("Profile")}
          onMouseLeave={() => setCurrentHovered("x")}
        >
          {activeComponent === "ProfileSection" ? (
            <div className="p-2 rounded-full bg-customDarkWhite">
              <CgProfile />
            </div>
          ) : (
            <div
              className="p-2"
              onClick={() => onComponentChange("ProfileSection")}
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
