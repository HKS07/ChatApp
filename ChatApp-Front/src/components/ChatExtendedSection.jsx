import SearchMessage from "./FourthSection/SearchMessage";
import ContactProfile from "./FourthSection/ContactProfile";
import { useContext } from "react";
import GlobalContext from "./Utils/GlobalContext";

const ChatExtendedSection = () => {
  const { activeChatExtendedSection } =
    useContext(GlobalContext);
  console.log(activeChatExtendedSection);

  return (
    <>
      {activeChatExtendedSection === 'ContactProfile' && <ContactProfile />}
      {activeChatExtendedSection === 'SearchMessage' && <SearchMessage />}
    </>
  );
};

export default ChatExtendedSection;
