import Body from "./ThirdSection/Body";
import Footer from "./ThirdSection/Footer";
import Header from "./ThirdSection/Header";
import { SecondSectionContext } from "../context/SecondSection";
import { useContext } from "react";
import Default from "./ThirdSection/Default";

const MessageSection = () => {
  const { currentChatLabel } = useContext(SecondSectionContext);
  return (
    <>
      {currentChatLabel === undefined ? (
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
