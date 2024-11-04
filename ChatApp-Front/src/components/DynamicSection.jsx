import ChatSection from './MiddleSection/ChatSection'
import ProfileSection from './MiddleSection/ProfileSection'
import SettingsSection from './MiddleSection/SettingsSection'

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
