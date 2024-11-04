import { BiMessageDetail } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const NotificationSection = ({ activeComponent, onComponentChange }) => {
  return (
    <div className="flex flex-col justify-between py-4 w-16 bg-customGray">
      <div className="text-white text-2xl mx-auto">
        {activeComponent === "ChatSection" ? (
          <div className="p-2 rounded-full bg-customDarkWhite">
            <BiMessageDetail />
          </div>
        ) : (
          <div className="p-2" onClick={() => onComponentChange('ChatSection')}> <BiMessageDetail/></div>
        )}
      </div>
      <div className="text-white text-2xl mx-auto">
      {activeComponent === "SettingsSection" ? (
          <div className="p-2 rounded-full bg-customDarkWhite">
            <IoSettingsOutline />
          </div>
        ) : (
          <div className="p-2" onClick={() => onComponentChange('SettingsSection')}> <IoSettingsOutline/></div>
        )}
        {activeComponent === "ProfileSection" ? (
          <div className="p-2 rounded-full bg-customDarkWhite">
            <CgProfile />
          </div>
        ) : (
          <div className="p-2" onClick={() => onComponentChange('ProfileSection')}> <CgProfile/></div>
        )}
      </div>
    </div>
  );
};

export default NotificationSection;
