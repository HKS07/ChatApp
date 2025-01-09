import AddUserSection from "./SecondSection/AddUserSection";
import ChatSection from "./SecondSection/ChatSection";
import ProfileSection from "./SecondSection/ProfileSection";
import SettingsSection from "./SecondSection/SettingsSection";
import { SecondSectionContext } from "../context/SecondSection";
import { useContext } from "react";

const DynamicSection = () => {
  const { dynamicActiveComponent } = useContext(SecondSectionContext);
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
