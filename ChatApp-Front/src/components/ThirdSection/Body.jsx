import MessageBox from "./MessageBox";
import { SecondSectionContext } from "../../context/SecondSection";
import { useContext, useEffect, useRef } from "react";
import { MessageContext } from "../../context/Messagecontext";
import { FaAnglesDown } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Body = () => {
  // const [currentmessages, setCurrentMessages] = useState(null);
  const { currentConversationUser } = useContext(SecondSectionContext);
  const accountDBInfo = useSelector(state => state.account.accountDBInfo);
  const { messages, setMessages } = useContext(MessageContext);
  const messagesEndRef = useRef(null);
  // console.log(messages);

  const handleScrollDown = () => {
    if(messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: "instant"});
    }
  }
  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:8080/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: currentConversationUser.convoId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch currentmessages");
      }

      const formattedMessages = await response.json();
      return formattedMessages;
    } catch (error) {
      console.error("Error fetching currentmessages:", error);
      return [];
    }
  };

  useEffect(() => {
    if(messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    }
  },[messages]);
  useEffect(() => {
    const loadMessages = async () => {
      const getMessages = await fetchMessages();
      if (getMessages.length === 0) {console.log("nothing in currentmessages"); }
      const message = getMessages?.messages;
      const sortedMessages = message.sort(
        (a, b) => new Date(a.timeStamp) - new Date(b.timeStamp)
      );
      setMessages(sortedMessages);
    };

    
    loadMessages();
  }, [currentConversationUser]);

  
  return (
    <div className="relative flex-grow w-full bg-message-body text-customLightWhite">
      <div className=" flex flex-col  h-[640px] overflow-y-scroll custom-scrollbar">
        <div className="absolute right-0 bottom-0 m-4 rounded-full text-xl outline-none p-1 bg-customGray" onClick={() => handleScrollDown()}>
          <FaAnglesDown />
        </div>
        {messages ? (
          messages?.map((message) => {
            const timeNow = new Date(message?.timeStamp)?.toLocaleTimeString("en-IN", {hour: "2-digit", minute:"2-digit", hour12: true});
            return <MessageBox
              key={message.id}
              message={message?.content}
              time={timeNow}
              isRead={false}
              byUser={accountDBInfo.id === message.senderId ? true : false}
            />;
          })
        ) : (
          <></>
        )}
        <div ref={messagesEndRef} />
      </div>
      
    </div>
  );
};

export default Body;
