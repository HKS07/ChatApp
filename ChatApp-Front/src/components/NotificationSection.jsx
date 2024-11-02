import { BiMessageDetail } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const NotificationSection = () => {
  return (
    <div className="flex flex-col justify-between py-4 w-16 bg-customGray">
      <div className="text-white text-2xl mx-auto">
        <BiMessageDetail />
      </div>
      <div className="text-white text-2xl mx-auto">
        <IoSettingsOutline className="my-3 mx-auto"/>
        <CgProfile className="my-3 mx-auto"/>
      </div>
    </div>
  );
};

export default NotificationSection;
