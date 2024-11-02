import Body from "./RightSection/Body";
import Footer from "./RightSection/Footer";
import Header from "./RightSection/Header";

const MessageSection = () => {
  return <div className="relative flex flex-col flex-grow ">
    <Header/>
    <Body/>
    <Footer/>
  </div>;
};

export default MessageSection;
