import SearchMessage from "./FourthSection/SearchMessage";
import ContactProfile from "./FourthSection/ContactProfile";
import { useSelector } from "react-redux";

const ChatExtendedSection = () => {
  // const { activeChatExtendedSection } = useContext(GlobalContext);
  const activeChatExtendedSection = useSelector(state => state.global.activeChatExtendedSection);

  return (
    <>
      {activeChatExtendedSection === "ContactProfile" && <ContactProfile />}
      {activeChatExtendedSection === "SearchMessage" && <SearchMessage />}
    </>
  );
};

export default ChatExtendedSection;
