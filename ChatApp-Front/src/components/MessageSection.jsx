import Body from "./ThirdSection/Body";
import Footer from "./ThirdSection/Footer";
import Header from "./ThirdSection/Header";
import Default from "./ThirdSection/Default";
import { useSelector } from "react-redux";

const MessageSection = () => {
  const currentConversationUser = useSelector(state => state.secondSection.currentConversationUser);

  return (
    <>
      {currentConversationUser === undefined ? (
        <Default />
      ) : (
        <div className="relative flex flex-col flex-grow ">
          <Header />
          <Body />
          <Footer />
        </div>
      )}
    </>
  );
};

export default MessageSection;
