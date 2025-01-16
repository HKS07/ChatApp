import AddUserSection from "./SecondSection/AddUserSection";
import ChatSection from "./SecondSection/ChatSection";
import ProfileSection from "./SecondSection/ProfileSection";
import SettingsSection from "./SecondSection/SettingsSection";
import { useSelector } from "react-redux";

const DynamicSection = () => {
  const dynamicActiveComponent = useSelector(state => state.secondSection.dynamicActiveComponent);
  return (
    <>
      {dynamicActiveComponent === "ChatSection" && <ChatSection />}
      {dynamicActiveComponent === "SettingsSection" && <SettingsSection />}
      {dynamicActiveComponent === "ProfileSection" && <ProfileSection />}
      {dynamicActiveComponent === "AddUserSection" && <AddUserSection />}
    </>
  );
};

export default DynamicSection;
