import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { useState, useContext } from "react";
import { SecondSectionContext } from "../../context/SecondSection";
import { MessageContext } from "../../context/Messagecontext";
import { ConversationContext } from "../../context/ConversationContext";
import { useSelector } from "react-redux";

const Footer = () => {
  const [typedMessage, setTypedMessage] = useState("");
  const { currentConversationUser } = useContext(SecondSectionContext);
  const accountDBInfo = useSelector(state => state.account.accountDBInfo);
  const { messages, setMessages } = useContext(MessageContext);
  const { conversations, setConversations } = useContext(ConversationContext);

  const sendMessage = async () => {
    try {
      const messageSent = await fetch("http://localhost:8080/message/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: currentConversationUser.convoId,
          senderId: accountDBInfo.id,
          content: typedMessage,
        }),
      });
      const jsonMessaggeSent = await messageSent.json();
      console.log("api", jsonMessaggeSent);

      if (messageSent.ok) {
        setMessages([...(messages || []), jsonMessaggeSent?.newMessage]);

        const updatedConvo = conversations.map((convo) => {
          if (convo.id === currentConversationUser.convoId) {
            convo.lastMessage = typedMessage;
            convo.updatedAt = new Date();
            return convo;
          } else return convo;
        });
        setConversations(updatedConvo);
        setTypedMessage("");
      }
    } catch (error) {
      console.log("error while sending message", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="w-full px-3 py-1 bg-customLightGray">
      <div className="w-full flex items-center text-3xl ">
        <div className="m-2 text-customDarkWhite">
          <MdOutlineEmojiEmotions />
        </div>
        <div className="m-2 text-customLightWhite">
          <IoMdAdd />
        </div>
        <div className="my-1 px-2 py-2 flex items-center flex-grow p-1 rounded-lg bg-[#2A3942] ">
          <input
            className="w-full bg-[#2A3942] text-lg  text-customLightWhite focus:outline-none"
            placeholder="Type a message"
            value={typedMessage}
            onKeyDown={handleKeyDown}
            onChange={(e) => setTypedMessage(e.target.value)}
          />
          {typedMessage ? (
            <IoIosSend
              className="text-customGreen3"
              onClick={() => sendMessage()}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="m-2 text-customDarkWhite">
          <FaMicrophone />
        </div>
      </div>
    </div>
  );
};

export default Footer;
