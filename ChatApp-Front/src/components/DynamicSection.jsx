import ChatSection from './SecondSection/ChatSection'
import ProfileSection from './SecondSection/ProfileSection'
import SettingsSection from './SecondSection/SettingsSection'

const DynamicSection = ({activeComponent}) => {
  return (
    <>
        {activeComponent == 'ChatSection' && <ChatSection/>}
        {activeComponent == 'SettingsSection' && <SettingsSection/>}
        {activeComponent == 'ProfileSection' && <ProfileSection/>}
    </>
  );
};

export default DynamicSection;
