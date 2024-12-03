import SearchMessage from "./FourthSection/SearchMessage";
import ContactProfile from "./FourthSection/ContactProfile";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const ChatExtendedSection = () => {
  const { activeChatExtendedSection } =
    useContext(GlobalContext);

  return (
    <>
      {activeChatExtendedSection === 'ContactProfile' && <ContactProfile />}
      {activeChatExtendedSection === 'SearchMessage' && <SearchMessage />}
    </>
  );
};

export default ChatExtendedSection;
